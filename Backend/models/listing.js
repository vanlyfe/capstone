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
      "price",
      "location",
      "max_accomodation",
      "model",
      "make",
      "year",
    ];

    requiredFields.forEach((field) => {
      if (!listings.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if (listings.location.length < 1) {
      throw new BadRequestError("No location provided");
    }

    if (listings.model.length < 1) {
      throw new BadRequestError("No car model provided");
    }

    // if (listings.image_url.length < 1) {
    //   throw new BadRequestError('No car image provided');
    // }

    if (listings.make.length < 1) {
      throw new BadRequestError("No car make provided");
    }

    if (listings.max_accomodation < 1) {
      throw new BadRequestError(
        "Maximum vehicle accomodation cannot be less than 1"
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
      throw new BadRequestError("Invalid location");
    }

    if (listingUpdate?.max_accomodation < 1) {
      throw new BadRequestError(
        "Vehicle should be able to accomodate at least one person"
      );
    }

    if (listingUpdate.model?.length < 1) {
      throw new BadRequestError("Invalid vehicle model");
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

  static intersection(first, second) {
    if (!first && !second) {
      return null;
    } else if (!first) {
      return second;
    } else if (!second) {
      return first;
    } else {
      let intersection = first.filter((a) =>
        second.some((b) => a.id === b.id)
      );
      return intersection;
    }
  }

  static async filterListings(search) {
    if (
      search.minPrice === "" &&
      search.maxPrice === "" &&
      search.minRating === "" &&
      search.model === "" &&
      search.location === "" &&
      search.year === ""
    ) {
      throw new BadRequestError("Must have at least one filter variable");
    }

    const minPrice = search.minPrice;
    const maxPrice = search.maxPrice;

    var price =
      minPrice && maxPrice
        ? await this.filterPrice(minPrice, maxPrice)
        : minPrice && !maxPrice
        ? await this.filterPrice(minPrice, null)
        : !minPrice && maxPrice
        ? await this.filterPrice(null, maxPrice)
        : null;

    var minRating =
      search.minRating === ""
        ? null
        : await this.filterRating(search.minRating);
    var location =
      search.location === ""
        ? null
        : await this.filterLocation(search.location);

    var year = search.year === "" ? null : await this.filterYear(search.year);
    var model =
      search.model === "" ? null : await this.filterMake(search.model);
    

    var res = this.intersection(price, minRating);
    res = this.intersection(res, location);
    res = this.intersection(res, model);
    res = this.intersection(res, year)

    return res;
  }

  static async filterYear(year) {
    const result = await db.query(
      `
           SELECT *
             FROM listings
             LEFT JOIN (
                  SELECT AVG(rating) AS rating, listing_id
                    FROM listings
                    LEFT JOIN ratings ON ratings.listing_id = listings.id
                    GROUP BY listing_id
                ) AS acc ON acc.listing_id = listings.id
            WHERE year =` +
        year +
        `;

         

   
        `
    );

    const res = result.rows;

    return res;
  }

  static async filterMake(make) {
    const result = await db.query(
      `
           SELECT * 
             FROM listings
             LEFT JOIN (
                  SELECT AVG(rating) AS rating, listing_id
                    FROM listings
                    LEFT JOIN ratings ON ratings.listing_id = listings.id
                    GROUP BY listing_id
                ) AS acc ON acc.listing_id = listings.id
                WHERE LOWER(make) = $1;
            

     

   
        `,
      [make.toLowerCase()]
    );

    const res = result.rows;

    return res;
  }

  static async filterLocation(location) {
    const result = await db.query(
      `
           SELECT * 
             FROM listings
             LEFT JOIN (
                  SELECT AVG(rating) AS rating, listing_id
                    FROM listings
                    LEFT JOIN ratings ON ratings.listing_id = listings.id
                    GROUP BY listing_id
                ) AS acc ON acc.listing_id = listings.id
            WHERE LOWER(location) = $1;

          

   
        `,
      [location.toLowerCase()]
    );

    const res = result.rows;

    return res;
  }

  static async filterPrice(min, max) {
    const result = await db.query(`
           SELECT * 
             FROM listings
             LEFT JOIN (
                  SELECT AVG(rating) AS rating, listing_id
                    FROM listings
                    LEFT JOIN ratings ON ratings.listing_id = listings.id
                    GROUP BY listing_id
                ) AS acc ON acc.listing_id = listings.id
            WHERE price > ${min ? min : 0} AND price < ${
      max ? max : Number.MAX_VALUE
    };

          

   
        `);

    const res = result.rows;

    return res;
  }

  static async filterRating(rating) {
    const result = await db.query(
      `
           SELECT * 
             FROM listings
             LEFT JOIN (
                  SELECT AVG(rating) AS rating, listing_id
                    FROM listings
                    LEFT JOIN ratings ON ratings.listing_id = listings.id
                    GROUP BY listing_id
                ) AS acc ON acc.listing_id = listings.id
            WHERE rating >` +
        rating +
        `;

          

   
        `
    );

    const res = result.rows;

    return res;
  }
}

module.exports = Listing;
