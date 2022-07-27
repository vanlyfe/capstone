const db = require("../db");
const { BadRequestError } = require("../utils/errors");


class Order{
    static async getOrders(){
        const result = await db.query(
            `
            SELECT *
            FROM orders
            
            `
        )

        const res = result.rows
        return res
    }

    static async getOrdersByUserId(userId){
        const result = await db.query(
            `
            SELECT * 
            FROM orders
            WHERE user_id = $1
            
            
            `, [userId]
        )


        const res = result.rows
        return res

    }
    
    static async getOrderById(id){
        const result = await db.query(
            `

            SELECT *
            FROM orders
            WHERE id = $1
            
            `, [id]
        )


        const res = result.rows

        return res
    }
}




module.exports = Order;