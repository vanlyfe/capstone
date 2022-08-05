const db = require('../db');
const { BadRequestError } = require('../utils/errors');
const { s3 } = require('../config');

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

  /**
   * return number of listings in database
   * @returns
   */
  static async getListingsCount() {
    const result = await db.query(
      `
      SELECT COUNT(*) FROM listings;
      `
    );

    const res = result.rows[0].count;

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

  static async postListing(listings, user, images) {
    const requiredFields = [
      'price',
      'location',
      'max_accomodation',
      'model',
      'make',
    ];

    requiredFields.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(listings, field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if (listings.location.length < 1) {
      throw new BadRequestError('No location provided');
    }

    if (listings.model.length < 1) {
      throw new BadRequestError('No car model provided');
    }

    if (listings.make.length < 1) {
      throw new BadRequestError('No car make provided');
    }

    if (listings.max_accomodation < 1) {
      throw new BadRequestError(
        'Maximum vehicle accomodation cannot be less than 1'
      );
    }

    const imagesArray = Object.values(images);

    if (imagesArray.length === 0 || imagesArray.length > 5) {
      throw new BadRequestError(
        'You must upload at least one image and no more than five images.'
      );
    }

    // console.log(imagesArray);

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
           RETURNING id;
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

    const id = result.rows[0].id;

    await this.postPhotostoS3(imagesArray, id);
    const urls = this.getS3Urls(imagesArray.length, id);

    console.log(urls);

    let toUpdateImages = { image_url: urls[0] };

    imagesArray.slice(1).forEach((_, i) => {
      toUpdateImages[`image_url${i + 2}`] = urls[i + 1];
    });

    const res = await this.editListing({
      listingUpdate: toUpdateImages,
      listingId: id,
    });

    return res;
  }

  // {
  //  listingUpdate: { image_url: 'https://s3.amazonaws.com/...', image_url2: 'https://s3.amazonaws.com/...' },
  //  listingId: id,
  // }
  //

  static async editListing({ listingUpdate, listingId }) {
    console.log(listingUpdate);

    if (listingUpdate?.location?.length < 1) {
      throw new BadRequestError('Invalid location');
    }

    if (listingUpdate.max_accomodation < 1) {
      throw new BadRequestError(
        'Vehicle should be able to accomodate at least one person'
      );
    }

    if (listingUpdate.model?.length < 1) {
      throw new BadRequestError('Invalid vehicle model');
    }

    let queryString = '';
    let listingUpdateEntries = Object.entries(listingUpdate);
    for (let i = 0; i < listingUpdateEntries.length; i++) {
      queryString += `${listingUpdateEntries[i][0]} = $${i + 1}, `;
    }

    const query = `UPDATE listings
        SET ${queryString}
        updatedAt = NOW()
        WHERE id = $${listingUpdateEntries.length + 1}
        RETURNING id,user_id,price, location, max_accomodation, model, description,image_url, image_url2, image_url3, image_url4, image_url5, fees, createdAt, updatedAt;`;

    console.log(query);
    const result = await db.query(query, [
      ...listingUpdateEntries.map((entry) => entry[1]),
      listingId,
    ]);

    const results = result.rows[0];

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

  // Helper functions for S3

  static getS3Urls(imagesLength, id) {
    const urls = [];

    for (let i = 0; i < imagesLength; i++) {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${id}-${i}`,
      };
      const url = s3.getSignedUrl('getObject', params);
      urls.push(url);
    }

    return urls;
  }

  static async postPhotostoS3(photos, id) {
    for (let i = 0; i < photos.length; i++) {
      const photo = Buffer.from(photos[i].data, 'base64');
      const respon = await s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `${id}-${i}`,
          Body: photo,
        })
        .promise();

      console.log(respon);
    }
  }
}

module.exports = Listing;
