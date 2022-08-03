const db = require("../db")

const createRatings = async (userIds, listingIds) => {
 

  await db.query(
    `
    INSERT INTO ratings(rating, listing_id, user_id)
    VALUES(
      4,
      ${listingIds[9]},
      ${userIds[2]}
    ),
    (
      3,
      ${listingIds[8]},
      ${userIds[1]}
    ),
    (
      2,
      ${listingIds[7]},
      ${userIds[0]}
    ),
    (
      1,
      ${listingIds[6]},
      ${userIds[1]}
    ),
    (
      2,
      ${listingIds[5]},
      ${userIds[2]}
    ),
    (
      3,
      ${listingIds[4]},
      ${userIds[0]}
    );
    `
  )

 

  const results = await db.query(`SELECT id FROM ratings ORDER BY id ASC`)

  const ids = results.rows.map((row) => row.id)
  return ids
}

module.exports = {
  createRatings,
}
