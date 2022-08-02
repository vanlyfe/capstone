const db = require("../db");
const { BadRequestError } = require("../utils/errors");


class Review{

    static async getReviewsByListingId(listingId){
        const result = await db.query(
            `
            SELECT * 
            FROM reviews
            WHERE listing_id = $1
            `, [listingId]
        )

        const res = result.rows
        
        return res
    }


    static async getReviewsByUserId(userId){
      const result = await db.query(
        `
        SELECT l.user_id , review, listing_id, r.createdAt, r.updatedAt
        FROM reviews AS r
        JOIN listings AS l ON l.id = r.listing_id
        WHERE l.user_id = $1
       
        
        
        `, [userId]
      )

      const res = result.rows

      return res
    }


    static async postReview({listingId, reviews, user}){
        const requiredFields = [
            "review",   
          ];
      
          requiredFields.forEach((field) => {
            if (!reviews.hasOwnProperty(field)) {
              throw new BadRequestError(`Missing ${field} in request body.`);
            }
          });

          if(reviews.review.length < 1){
            throw new BadRequestError("Kindly provide a review")
          }

          const result = await db.query(
            `
            INSERT INTO reviews(
                review,
                listing_id,
                user_id
            )
            VALUES ($1,$2,$3)
            RETURNING id, review, listing_id, user_id
            
            `, [reviews.review, listingId, user.id]
          )

          const res = result.rows
          return res


    }

    static async editReview({ reviewUpdate, reviewId }) {
      
      if(!reviewUpdate.review){
        throw new BadRequestError("Review must have at least one character, otherwise delete the review")
      }
  
      const result = await db.query(
        `
        UPDATE reviews
                SET review = $1,
                updatedAt = NOW()
                WHERE id = $2
                RETURNING id, review, createdAt, updatedAt, listing_id, user_id;
        `, [reviewUpdate.review, reviewId]
      )

      const res = result.rows[0]
     
      return res;
    }

    static async deleteReview(reviewId){
       await db.query(
        `
        DELETE FROM reviews
        WHERE id = $1;
       
        
        `, [reviewId]
      )

      

    }
    
}




module.exports = Review;