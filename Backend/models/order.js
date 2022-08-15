const db = require("../db");
const { BadRequestError } = require("../utils/errors");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Order {
  static async getOrdersByUserId(userId) {
    const result = await db.query(
      `
            SELECT * 
            FROM orders
            WHERE user_id = $1
            
            
            `,
      [userId]
    );

    const res = result.rows;
    return res;
  }

  static async getOrderById(id) {
    const result = await db.query(
      `

            SELECT *
            FROM orders
            WHERE id = $1
            
            `,
      [id]
    );

    const res = result.rows;

    return res;
  }

  static async postOrder({ listingId, orders, user }) {
    const requiredFields = ["taxes", "total", "guests", "startDate", "endDate"];

    requiredFields.forEach((field) => {
      if (!orders.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    const start = new Date(orders.startDate);
    const end = new Date(orders.endDate);

    if (start >= end) {
      throw new BadRequestError(
        "Start date cannot be after or on the same day as end date"
      );
    }

    if (orders.taxes === 0) {
      throw new BadRequestError("Taxes cannot be zero");
    }

    if (orders.total === 0) {
      throw new BadRequestError("Total cannot be zero");
    }

    if (orders.guests < 1) {
      throw new BadRequestError("Cannot have less than one guest");
    }

    const result = await db.query(
      `
              INSERT INTO orders(
                    taxes,
                    total,
                    guests,  
                    user_id,
                    listing_id,
                    startDate,
                    endDate,
                    fees

                    
                    )
               VALUES ($1,$2,$3,$4,$5,$6,$7, $8)
               RETURNING id, taxes, total, guests, user_id, listing_id, startDate, endDate, fees;
              `,
      [
        orders.taxes,
        orders.total,
        orders.guests,
        user.id,
        listingId,
        start,
        end,
        orders.fees,
      ]
    );

    const res = result.rows;

    return res;
  }

  static async getUserPastOrders(userId) {
    const result = await db.query(
      `
          SELECT * 
          FROM orders
          WHERE user_id = $1 AND NOW() > endDate
          
          
          `,
      [userId]
    );

    const res = result.rows;
    return res;
  }

  static async getUserActiveOrders(userId) {
    const result = await db.query(
      `
          SELECT * 
          FROM orders
          WHERE user_id = $1 AND NOW() < endDate
          
          
          `,
      [userId]
    );

    const res = result.rows;
    return res;
  }

  static async sendmail(id) {
    var email = await db.query(
      `
        SELECT email
        FROM users
        WHERE id = $1
    
    `,
      [id]
    );

    email = email.rows[0].email;

    var link = `${process.env.CLIENT_URL}login`;

    const msg = {
      to: email,
      from: "vanlyfe.com@gmail.com",
      subject: "BOOKING CONFIRMATION",
      text: `Text`,
      html: `Your order request has been received and the host has been notified. 
      You will receive a response within 24hrs when the host confirms the booking. 
      Kindly <a href=${link}>login</a> to make any updates to your order.
      Thank you for choosing vanlyfe!`,
    };
    sgMail.send(msg);
  }

  static async sendmailToHost(listing_id) {
    var email = await db.query(
      `
        SELECT email
        FROM orders AS o JOIN listings AS l on o.listing_id = l.id JOIN users AS u on l.user_id = u.id
        WHERE listing_id = $1
    
    `,
      [listing_id]
    );

    email = email.rows[0].email;

    var link = `${process.env.CLIENT_URL}login`;

    const msg = {
      to: email,
      from: "vanlyfe.com@gmail.com",
      subject: "NEW ORDER",
      text: `Text`,
      html: `
      New order request has been received. 
      Please note that this order expires within 24 hours.
      Kindly <a href=${link}>login</a> to accept the order.
      Thank you for choosing vanlyfe!`,
    };
    sgMail.send(msg);
  }
}

module.exports = Order;
