const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Listing {
  static async getListings() {
    const result = await db.query(`
        SELECT * FROM listings;
        `);

    const res = result.rows;

    return res;
  }

  static async getListingById(id) {
    const result = await db.query(
      `
            SELECT * FROM listings
            WHERE id = $1;
            `,
      [id]
    );

    const res = result.rows[0];

    return res;
  }

  static async getUserListings(userId) {
    const result = await db.query(
      `
            SELECT * FROM listings
            WHERE user_id = $1;
            `,
      [userId]
    );

    const res = result.rows;
    return res;
  }

  static async getBestListings() {
    const query = `
        SELECT * 
        FROM (
             SELECT AVG(rating) AS rating, listing_id
             FROM listings
             JOIN ratings ON ratings.listing_id = listings.id
             GROUP BY listing_id
        ) AS acc
        JOIN listings ON acc.listing_id = listings.id
        ORDER BY rating DESC
        LIMIT 4
        
        `;

    const result = await db.query(query);

    const res = result.rows;

    return res;
  }

  static async postListing({ listings, user }) {
    const requiredFields = [
      "price",
      "location",
      "max_accomodation",
      "model",
      "image_url",
    ];

    requiredFields.forEach((field) => {
      if (!listings.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if(listings.location.length < 1){
        throw new BadRequestError("No location provided")

    }

    if(listings.model.length < 1){
        throw new BadRequestError("No car model provided")

    }

    if(listings.image_url.length < 1){
        throw new BadRequestError("No car image provided")

    }

    if(listings.max_accomodation < 1){
        throw new BadRequestError("Maximum vehicle accomodation cannot be less than 1")
    }

    const result = await db.query(
      `
          INSERT INTO listings(
                price,
                location,
                max_accomodation,
                model,
                image_url,
                user_id
                description
                )
           VALUES ($1,$2,$3,$4,$5,$6,$7)
           RETURNING price, location, max_accomodation, model, image_url, user_id, description;
          `,
      [
        listings.price,
        listings.location,
        listings.max_accomodation,
        listings.model,
        listings.image_url,
        user.id,
        listings.description,
      ]
    );

    const res = result.rows;

    return res;
  }
}

module.exports = Listing;
