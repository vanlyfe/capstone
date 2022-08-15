const db = require("../db");
const { BadRequestError } = require("../utils/errors");
const User = require("./user");

class Review {
  static async getReviewsByListingId(listingId) {
    // const result = await db.query(
    //   `
    //         SELECT u.id , r.listing_id, u.firstName, u.lastName, review, u.image_url, u.rating, r.createdAt
    //         FROM reviews AS r
    //         JOIN users AS u ON u.id = r.user_id
    //         LEFT JOIN (
    //           SELECT ratings.rating , ratings.user_id
    //           FROM ratings
    //           RIGHT JOIN users ON users.id = ratings.user_id
    //           WHERE listing_id = $1

    //         ) AS ra ON ra.user_id = u.id
    //         WHERE r.listing_id = $1
    //         `,
    //   [listingId]
    // );


    const result = await db.query(
      `
            SELECT u.id , r.listing_id, u.firstName, u.lastName, review, u.image_url, ra.rating, r.createdAt
            FROM reviews AS r
            JOIN users AS u ON u.id = r.user_id
            JOIN ratings AS ra ON r.rating_id = ra.id
            WHERE r.listing_id = $1
            `,
      [listingId]
    );


   

    const res = result.rows;

    return res;
  }

  static async getReviewsByUserId(userId) {
    // var result = await db.query(
    //   `
    //     SELECT r.user_id AS reveiwer_id, u.id AS host_id, rater.firstName, rater.lastName, rater.image_url, rater.updatedAt, r.review AS review, rates.rating AS rating, r.id AS review_id
    //     FROM reviews AS r
    //     JOIN listings AS l ON l.id = r.listing_id
    //     JOIN users AS u ON l.user_id = u.id
    //     JOIN (
    //       SELECT image_url, u.id AS id, firstName, lastName, r.updatedAt, review
    //       FROM reviews AS r
    //       JOIN users AS u ON r.user_id = u.id
    //     ) AS rater on rater.id = r.user_id
    //     JOIN (
    //       SELECT AVG(rating) AS rating, acc.user_id   
    //       FROM (
    //         SELECT rating, l.user_id
    //         FROM listings AS l
    //         JOIN ratings AS r ON r.listing_id = l.id
    //       ) AS acc
    //       GROUP BY acc.user_id
          
         
          
         
    //     ) AS rates ON rates.user_id = r.user_id  
    //     WHERE u.id = $1
        
        
        
        
    //     `,
    //   [userId]
    // );

    var result = await db.query(
      `
        SELECT r.user_id AS reveiwer_id, u.id AS host_id, rater.firstName, rater.lastName, rater.image_url, rater.updatedAt, r.review AS review, ra.rating AS rating, r.id AS review_id
        FROM reviews AS r
        JOIN listings AS l ON l.id = r.listing_id
        JOIN users AS u ON l.user_id = u.id
        JOIN (
          SELECT image_url, u.id AS id, firstName, lastName, r.updatedAt, review
          FROM reviews AS r
          JOIN users AS u ON r.user_id = u.id
        ) AS rater on rater.id = r.user_id
        JOIN ratings AS ra ON ra.id = r.rating_id

        WHERE u.id = $1
        
        
        
        
        `,
      [userId]
    );

    var res = result.rows;
    var acc = [];
    var ans = [];

    res.forEach((elem) => {
      if (!acc.includes(elem.review_id)) {
        acc.push(elem.review_id);
        ans.push(elem);
      }
    });

    return ans;
  }

  static async postReview({ listingId, reviews, user }) {
    const requiredFields = ["review", "rating_id"];

    requiredFields.forEach((field) => {
      if (!reviews.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if (reviews.review.length < 1) {
      throw new BadRequestError("Kindly provide a review");
    }

    const result = await db.query(
      `
            INSERT INTO reviews(
                review,
                listing_id,
                user_id,
                rating_id
            )
            VALUES ($1,$2,$3,$4)
            RETURNING id, review, listing_id, user_id
            
            `,
      [reviews.review, listingId, user.id, reviews.rating_id]
    );

    const res = result.rows;
    return res;
  }

  static async editReview({ reviewUpdate, reviewId }) {
    if (!reviewUpdate.review) {
      throw new BadRequestError(
        "Review must have at least one character, otherwise delete the review"
      );
    }

    const result = await db.query(
      `
        UPDATE reviews
                SET review = $1,
                updatedAt = NOW()
                WHERE id = $2
                RETURNING id, review, createdAt, updatedAt, listing_id, user_id;
        `,
      [reviewUpdate.review, reviewId]
    );

    const res = result.rows[0];

    return res;
  }

  static async deleteReview(reviewId) {
    await db.query(
      `
        DELETE FROM reviews
        WHERE id = $1;
       
        
        `,
      [reviewId]
    );
  }
}

module.exports = Review;
