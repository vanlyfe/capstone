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

    
}




module.exports = Listing;