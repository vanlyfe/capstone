const db = require("../db")

const createOrders = async (userIds, listingIds) => {


 

  await db.query(
    `
    INSERT INTO orders(user_id, taxes, total, guests, listing_id, startDate, endDate)
    VALUES(
     ${userIds[0]},
      5.99,
      20.99,
      3,
      ${listingIds[0]},
      '11/6/2022',
      '11/10/2022'
    ),
    (
     ${userIds[1]},
      10.99,
      25.00,
      2,
      ${listingIds[1]},
      '11/6/2023',
      '12/10/2023'
    ),
    (
    ${userIds[2]},
      30.50,
      200.00,
      7,
      ${listingIds[2]},
      '11/6/2000',
      '11/10/2000'
    );
    `
  )

 

  const results = await db.query(`SELECT id FROM orders ORDER BY id ASC`)

  const ids = results.rows.map((row) => row.id)
  return ids
}

module.exports = {
  createOrders,
}
