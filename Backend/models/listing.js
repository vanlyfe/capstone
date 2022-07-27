const db = require("../db");
const { BadRequestError } = require("../utils/errors");


class Listing{
    static async getListings(){
        const result = await db.query(`
        SELECT * FROM listings;
        `
         )

        const res = result.rows

         return res;
    }

    static async getListingById(id){

        const result = await db.query(
            `
            SELECT * FROM listings
            WHERE id = $1;
            `, [id]
        )

        const res = result.rows[0]


        return res;
        
    }


    static async getUserListings(userId){
        const result = await db.query(
            `
            SELECT * FROM listings
            WHERE user_id = $1;
            `, [userId]
        )

        const res = result.rows
        return res;
    
    }

    static async getBestListings(){
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
        
        `

        

        const result = await db.query(query)

        const res = result.rows

        return res
        
    }

    
}




module.exports = Listing;