const db = require("../db");
const { BadRequestError } = require("../utils/errors");
const User = require("./user")

class Rating{
    static async getRatingByListingId(listingId){
        const result = await db.query(
            `
            SELECT AVG(rating)
            FROM ratings
            WHERE listing_id = $1
            
            `, [listingId]
        )

        const res = result.rows

        return res
    }


    static async postRating({listingId, ratings, user}){
        const requiredFields = [
            "rating",
           
          ];
      
          requiredFields.forEach((field) => {
            if (!ratings.hasOwnProperty(field)) {
              throw new BadRequestError(`Missing ${field} in request body.`);
            }
          });
      
          if(ratings.rating < 0 || ratings.rating > 5 ){
              throw new BadRequestError("Invalid rating value")
      
          }


          const result = await db.query(
            `
            INSERT INTO ratings(
                    rating,
                    listing_id,
                    user_id
            )
            VALUES ($1,$2, $3)
            RETURNING id, rating, listing_id, user_id

            `, [ratings.rating, listingId, user.id]
          )

          const res = result.rows
          
          return res


    }

    
}




module.exports = Rating;