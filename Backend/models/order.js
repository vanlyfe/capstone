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

    const curr = new Date();
    const start = new Date(orders.startDate);
    const end = new Date(orders.endDate);

    if (start < curr) {
      throw new BadRequestError("Start date cannot be before today");
    }

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

  static async editOrder(orderUpdate, orderId) {
    var listing = await db.query(
      `
      SELECT o.startDate, o.endDate, l.price, l.fees, l.max_accomodation, o.id
      FROM orders AS o
      JOIN listings AS l ON o.listing_id = l.id
      WHERE o.id = $1
      
      `,
      [orderId]
    );

    listing = listing.rows[0];

    let queryString = "";

    let orderUpdateEntries = Object.entries(orderUpdate);

    var params = 1;

    var curr = new Date();
    for (let i = 0; i < orderUpdateEntries.length; i++) {
      if (orderUpdateEntries[i][1] === "" || !orderUpdateEntries[i][1]) {
        continue;
      }

      if (orderUpdateEntries[i][0] === "endDate") {
        var end = new Date(orderUpdate.endDate);
        if (end <= curr) {
          throw new BadRequestError("Invalid checkout date");
        }

        var start = orderUpdate.startDate
          ? new Date(orderUpdate.startDate)
          : new Date(listing.startdate);

        if (end <= start) {
          throw new BadRequestError(
            "Checkout date cannot be before or on the same day as check in date"
          );
        }
      }

      if (orderUpdateEntries[i][0] === "startDate") {
        var start = new Date(orderUpdate.startDate);
        if (start <= curr) {
          throw new BadRequestError("Invalid check in date");
        }

        var end = orderUpdate.endDate
          ? new Date(orderUpdate.endDate)
          : new Date(listing.enddate);

        if (end <= start) {
          throw new BadRequestError(
            "Check in date cannot be after or on the same day as checkout date"
          );
        }
      }

      if (orderUpdateEntries[i][0] === "taxes") {
        var taxes = orderUpdate.taxes;

        if (taxes <= 0) {
          throw new BadRequestError("Invalid tax amount");
        }
      }

      if (orderUpdateEntries[i][0] === "total") {
        var total = orderUpdate.total;

        if (total <= 0) {
          throw new BadRequestError("Invalid total amount");
        }
      }

      if (orderUpdateEntries[i][0] === "guests") {
        var guests = orderUpdate.guests;

        if (guests > listing.max_accomodation) {
          throw new BadRequestError("Number of guests exceeds maximum allowed");
        }

        if (guests < 1) {
          throw new BadRequestError("Must have at least one guest");
        }
      }

      queryString += `${orderUpdateEntries[i][0]} = $${params}, `;
      params++;
    }

    const taxrate = 0.15;

    var starter = orderUpdate.startDate
      ? orderUpdate.startDate
      : listing.startdate;

    var ender = orderUpdate.endDate ? orderUpdate.endDate : listing.enddate;

    const days = this.getNumberOfDays(starter, ender);

    const fees = listing.fees;
    var subtotal = days * listing.price;
    subtotal = Math.round(subtotal * 100) / 100;

    var tax = subtotal * taxrate;
    tax = Math.round(tax * 100) / 100;

    var total = subtotal + tax + fees;
    total = Math.round(total * 100) / 100;

    queryString += `taxes = $${params}, fees = $${params + 1}, total = $${
      params + 2
    },`;

    const query = ` UPDATE orders
                    SET ${queryString}
                    updatedAt = NOW()
                    WHERE id = ${orderId}
                    RETURNING id, user_id, total, startDate, endDate, fees, taxes, guests, updatedAt, createdAt, listing_id;
    
    `;

    console.log(query);

    var entry = [];

    orderUpdateEntries.map((item) => {
      if (item[1] !== "" && item[1]) {
        entry.push(item[1]);
      }
    });

    entry.push(tax);
    entry.push(fees);
    entry.push(total);

    const result = await db.query(query, entry);
    const res = result.rows;

    return res;
  }

  static getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }

  static async sendmail(id) {

    var email = await db.query(`
        SELECT email
        FROM users
        WHERE id = $1
    
    `, [id])

    email = email.rows[0].email

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
}

module.exports = Order;
