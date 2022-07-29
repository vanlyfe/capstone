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
    
}




module.exports = Review;