const db = require("../db");
const { BadRequestError } = require("../utils/errors");

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

    const curr = new Date()
    const start = new Date(orders.startDate);
    const end = new Date(orders.endDate);

    if(start < curr){
      throw new BadRequestError("Start date cannot be before today")
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

  static async editOrder( orderUpdate, orderId ) {
    var listing = await db.query(
      `
      SELECT o.startDate, o.endDate, l.price, l.fees, l.max_accomodation, o.id
      FROM orders AS o
      JOIN listings AS l ON o.listing_id = l.id
      WHERE o.id = $1
      
      `,[orderId]

    )

    listing = listing.rows[0]


    // let queryString = "";

    // let listingUpdateEntries = Object.entries(listingUpdate);
    // var params = 1;
    // for (let i = 0; i < listingUpdateEntries.length; i++) {
    //   if (listingUpdateEntries[i][1] === "") {
    //     continue;
    //   }

    //   if (
    //     listingUpdateEntries[i][1] < 1 &&
    //     listingUpdateEntries[i][0] === "max_accomodation"
    //   ) {
    //     throw new BadRequestError(
    //       "Vehicle should be able to accomodate at least one person"
    //     );
    //   }

    //   if (
    //     listingUpdateEntries[i][1] <= 0 &&
    //     listingUpdateEntries[i][0] === "price"
    //   ) {
    //     throw new BadRequestError("Invalid price");
    //   }

    //   queryString += `${listingUpdateEntries[i][0]} = $${params}, `;
    //   params++;
    // }

    // const query = `UPDATE listings
    //     SET ${queryString}
    //     updatedAt = NOW()
    //     WHERE id = ${listingId}
    //     RETURNING id,user_id,price, location, max_accomodation, model, description,image_url, image_url2, image_url3, image_url4, image_url5, fees, createdAt, updatedAt;`;

    // var entry = [];
    // listingUpdateEntries.map((item) => {
    //   //   console.log(entry[1])
    //   if (item[1] !== "") {
    //     entry.push(item[1]);
    //   }
    // });

    // const result = await db.query(query, entry);

    // const results = result.rows[0];

    return listing;
  }
}

module.exports = Order;
