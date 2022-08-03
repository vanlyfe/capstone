const db = require("../db")

const createReviews = async () => {
 

  await db.query(
    `
    INSERT INTO reviews(review, listing_id, user_id)
    VALUES(
      'Great car, clean and safe. Loved it',
      1,
      1
    ),
    (
      'Bit worse than last time but still worth it',
      1,
      1
    
    ),
    (
      'Too overpriced in my opinion',
      1,
      1
    
    ),
    (
      'Its a decent place to stay for a night',
      1,
      4
    
    ),
    (
      'Very dirty, terrible noisy neighbourhood, please DO NOT rent this van',
      2,
      2
    
    ),
    (
      'Noisy neighbourhood with constant fireworks and very insecure',
      2,
      3
    
    );
    `
  )

 

  const results = await db.query(`SELECT id FROM reviews ORDER BY id ASC`)

  const ids = results.rows.map((row) => row.id)
  return ids
}

module.exports = {
  createReviews,
}
