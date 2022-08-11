const db = require("../db");

const createReviews = async (userIds, listingIds) => {
  await db.query(
    `
    INSERT INTO reviews(review, listing_id, user_id)
    VALUES(
      'Great car, clean and safe. Loved it',
      ${listingIds[5]},
      ${userIds[2]}
    ),
    (
      'Bit worse than last time but still worth it',
      ${listingIds[4]},
      ${userIds[1]}
    
    ),
    (
      'Too overpriced in my opinion',
      ${listingIds[3]},
      ${userIds[0]}
    
    ),
    (
      'Its a decent place to stay for a night',
      ${listingIds[1]},
      ${userIds[1]}
    
    ),
    (
      'Very dirty, terrible noisy neighbourhood, please DO NOT rent this van',
      ${listingIds[1]},
      ${userIds[2]}
    
    ),
    (
      'Noisy neighbourhood with constant fireworks and very insecure',
      ${listingIds[0]},
      ${userIds[0]}
    
    );
    `
  );

  const results = await db.query(`SELECT id FROM reviews ORDER BY id ASC`);

  const ids = results.rows.map((row) => row.id);
  return ids;
};

module.exports = {
  createReviews,
};
