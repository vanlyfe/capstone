const db = require("../db")

const createRatings = async () => {
 

  await db.query(
    `
    INSERT INTO ratings(rating, listing_id, user_id)
    VALUES(
      4,
      12,
      1
    ),
    (
      3,
      11,
      2
    ),
    (
      2,
      10,
      3
    ),
    (
      1,
      12,
      1
    ),
    (
      2,
      11,
      2
    ),
    (
      3,
      10,
      3
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
