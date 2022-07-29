const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Listing {
  static async getListings() {
    const result = await db.query(`
    SELECT * INTO temptable
    FROM listings
    LEFT JOIN (
         SELECT AVG(rating) AS rating, listing_id
         FROM listings
        LEFT JOIN ratings ON ratings.listing_id = listings.id
         GROUP BY listing_id
    ) AS acc ON acc.listing_id = listings.id;

    ALTER TABLE temptable
    DROP COLUMN listing_id;

    
    
     
   
        `);

    
    const res = result[2].rows;

    return res;
  }

  static async getListingById(id) {
    const result = await db.query(
      `
      SELECT * INTO temptable
    FROM listings
    LEFT JOIN (
         SELECT AVG(rating) AS rating, listing_id
         FROM listings
        LEFT JOIN ratings ON ratings.listing_id = listings.id
         GROUP BY listing_id
    ) AS acc ON acc.listing_id = listings.id
    WHERE id =` + id + `;

    ALTER TABLE temptable
    DROP COLUMN listing_id;

    SELECT * FROM temptable;
    DROP TABLE temptable;
      
            `
    
    );

    const res = result[2].rows;

    return res;
  }

  static async getUserListings(userId) {
    const result = await db.query(
      `
      SELECT * INTO temptable
      FROM listings
      LEFT JOIN (
           SELECT AVG(rating) AS rating, listing_id
           FROM listings
          LEFT JOIN ratings ON ratings.listing_id = listings.id
           GROUP BY listing_id
      ) AS acc ON acc.listing_id = listings.id
      WHERE user_id =` + userId + `;
  
      ALTER TABLE temptable
      DROP COLUMN listing_id;
  
      SELECT * FROM temptable;
      DROP TABLE temptable;
            
            `
    
    );

    const res = result[2].rows;
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
                user_id,
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

  static async editListing({listingUpdate, listingId}){
    if(listingUpdate.location?.length < 1){
      throw new BadRequestError("Invalid location")
    }

    if(listingUpdate.max_accomodation){
      if(listingUpdate.max_accomodation < 1){
        throw new BadRequestError("Vehicle should be able to accomodate at least one person")
      }
    }

    if(listingUpdate.model?.length < 1){
      throw new BadRequestError("Invalid vehicle model")
    }

    if(listingUpdate.image_url?.length < 1){
      throw new BadRequestError("Invalid image, listing must have at least one image")
    }


    var results = {};
    

    for (var [key, value] of Object.entries(listingUpdate)) {
      

      const query =
        `UPDATE listings
                       SET ` +
        key +
        ` = $1,
                       updatedAt = NOW()
                   WHERE id = $2
                   RETURNING id,user_id,price, location, max_accomodation, model, decription,image_url, fees, createdAt, updatedAt;`;

      const result = await db.query(query, [
        value,
        listingId,
      ]);

      results = result.rows[0];
    }

    return results;

  }
}

module.exports = Listing;
