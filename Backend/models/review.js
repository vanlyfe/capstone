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
    
}




module.exports = Review;