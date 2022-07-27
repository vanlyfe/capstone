const db = require("../db");
const { BadRequestError } = require("../utils/errors");


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

    
}




module.exports = Rating;