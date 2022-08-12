const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Favorite {
  static async getUserFavorites(userId) {
    const result = await db.query(
      `
        SELECT make, model, year, l.createdAt, max_accomodation, price, acc.rating, location, f.id, f.listing_id
        
            FROM listings AS l
            JOIN favorites AS f ON l.id = f.listing_id
            LEFT JOIN (
                SELECT AVG(rating) AS rating, listing_id
                FROM listings
                LEFT JOIN ratings ON ratings.listing_id = listings.id
                GROUP BY listing_id
           ) AS acc ON acc.listing_id = f.listing_id
            WHERE f.user_id = $1;
            `,
      [userId]
    );

    var res = result.rows;
    var ans = []

    for(let i = 0; i < res.length; i++){
      var curr = res[i]
      ans.push(curr.listing_id)
    }

    

    return res;
  }

  static async getFavoritesIds(userId){
    const result = await db.query(
      `
            SELECT f.listing_id
            FROM listings AS l
            JOIN favorites AS f ON l.id = f.listing_id
            LEFT JOIN (
                SELECT AVG(rating) AS rating, listing_id
                FROM listings
                LEFT JOIN ratings ON ratings.listing_id = listings.id
                GROUP BY listing_id
           ) AS acc ON acc.listing_id = f.listing_id
            WHERE f.user_id = $1;
            `,
      [userId]
    );

    var res = result.rows;
    var ans = []

    for(let i = 0; i < res.length; i++){
      var curr = res[i]
      ans.push(curr.listing_id)
    }

    

    return ans;

  }

  static async postFavorite(userId, listingId) {
    const result = await db.query(
      `
            INSERT INTO favorites(user_id, listing_id)
            VALUES($1,$2)
            RETURNING id, user_id, listing_id;
            `,
      [userId, listingId]
    );

    const res = result.rows;

    return res;
  }

  static async deleteFavorite(userId, listingId) {
    await db.query(
      `
            DELETE FROM favorites
            WHERE user_id = $1 AND listing_id = $2;
           
            
            `,
      [userId, listingId]
    );
  }
}

module.exports = Favorite;
