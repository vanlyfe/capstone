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

    static async postOrder({listingId, orders, user }) {
        const requiredFields = [
          "taxes",
          "total",
          "guests",
          "startDate",
          "endDate",
          
          
        ];
    
        requiredFields.forEach((field) => {
          if (!orders.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body.`);
          }
        });
    
        if(orders.taxes === 0){
            throw new BadRequestError("Taxes cannot be zero")
    
        }
    
        if(orders.total === 0){
            throw new BadRequestError("Total cannot be zero")
    
        }
    
        if(orders.guests < 1){
            throw new BadRequestError("Cannot have less than one guest")
    
        }

        const start = new Date(orders.startDate)
        const end = new Date(orders.endDate)


        if(start > end){
            throw new BadRequestError("Start date cannot be after end date")
        }
    
        
    
        const result = await db.query(
          `
              INSERT INTO orders(
                    taxes,
                    total,
                    guests,  
                    user_id,
                    listing_id,
                    startDate,
                    endDate,
                    fees

                    
                    )
               VALUES ($1,$2,$3,$4,$5,$6,$7, $8)
               RETURNING id, taxes, total, guests, user_id, listing_id, startDate, endDate, fees;
              `,
          [
            orders.taxes,
            orders.total, 
            orders.guests,
            user.id,
            listingId,
            start,
            end,
            orders.fees



            
          ]
        );
    
        const res = result.rows;
    
        return res;
      }
}




module.exports = Order;