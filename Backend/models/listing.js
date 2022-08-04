const db = require('../db');
const { BadRequestError } = require('../utils/errors');

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

    SELECT * FROM temptable;
    DROP TABLE temptable;

    
    
     
   
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
    WHERE id =` +
        id +
        `;

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
      WHERE user_id =` +
        userId +
        `;
  
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
      'price',
      'location',
      'max_accomodation',
      'model',
      'make',
      'year'
    ];

    requiredFields.forEach((field) => {
      if (!listings.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if (listings.location.length < 1) {
      throw new BadRequestError('No location provided');
    }

    if (listings.model.length < 1) {
      throw new BadRequestError('No car model provided');
    }

    // if (listings.image_url.length < 1) {
    //   throw new BadRequestError('No car image provided');
    // }

    if (listings.make.length < 1) {
      throw new BadRequestError('No car make provided');
    }

    if (listings.max_accomodation < 1) {
      throw new BadRequestError(
        'Maximum vehicle accomodation cannot be less than 1'
      );
    }

    console.log(listings);

    const result = await db.query(
      `
          INSERT INTO listings(
                price,
                location,
                max_accomodation,
                make,
                model,
                year,
                user_id,
                description
                )
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
           RETURNING price, location, max_accomodation, make, model, year, user_id, description;

          `,
      [
        Number(listings.price),
        listings.location,
        listings.max_accomodation,
        listings.make,
        listings.model,
        Number(listings.year),
        user.id,
        listings.description,
      ]
    );

    const res = result.rows;

    return res;
  }

  static async editListing({ listingUpdate, listingId }) {
    if (listingUpdate.location?.length < 1) {
      throw new BadRequestError('Invalid location');
    }

    if (listingUpdate?.max_accomodation < 1) {
      throw new BadRequestError(
        'Vehicle should be able to accomodate at least one person'
      );
    }

    if (listingUpdate.model?.length < 1) {
      throw new BadRequestError('Invalid vehicle model');
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
                   RETURNING id,user_id,price, location, max_accomodation, model, description,image_url, fees, createdAt, updatedAt;`;

      const result = await db.query(query, [value, listingId]);

      results = result.rows[0];
    }

    return results;
  }

  static async deleteListing(listingId) {
    await db.query(
      `
      DELETE FROM listings
      WHERE id = $1;
     
      
      `,
      [listingId]
    );
  }




  static async filterYear(year){

  }

  static async filterModel(model){

  } 

  static async filterMake(make){

  }

  static async filterLocation(location){

  }

  static async filterPrice(min, max){

  }

  static async filterRating(rating){

  }
}

module.exports = Listing;
