const { createUsers } = require("./createUsers");
const { createListings } = require("./createListings");
const { createOrders } = require("./createOrders");
const { createRatings } = require("./createRatings");
const { createReviews } = require("./createReviews");

const db = require("../db");

const testListingIds = [];
const testOrderIds = [];
const testRatingIds = [];
const testReviewIds = [];
const testUserIds = [];
const testTokens = {
  ammarToken: "",
  edilToken: "",
  vernonToken: "",
  joramToken: "",
};

async function commonBeforeAll() {
  // delete all current test data
  await db.query(`DELETE FROM reviews`);
  await db.query(`DELETE FROM listings`);
  await db.query(`DELETE FROM ratings`);
  await db.query(`DELETE FROM orders`);
  await db.query(`DELETE FROM users`);

  // insert fresh test data
  var userIds = await createUsers();
  var tokens = userIds.testTokens;
  testTokens.ammarToken = tokens.ammarToken;
  testTokens.vernonToken = tokens.vernonToken;
  testTokens.edilToken = tokens.edilToken;
  testTokens.joramToken = tokens.joramToken;

  userIds = userIds.ids;

  for (let i = 0; i < userIds.length; i++) {
    testUserIds.push(userIds[i]);
  }

  const listingIds = await createListings(userIds);

  for (let i = 0; i < listingIds.length; i++) {
    testListingIds.push(listingIds[i]);
  }

  const orderIds = await createOrders(userIds, listingIds);

  for (let i = 0; i < orderIds.length; i++) {
    testOrderIds.push(orderIds[i]);
  }

  const ratingIds = await createRatings(userIds, listingIds);

  for (let i = 0; i < ratingIds.length; i++) {
    testRatingIds.push(ratingIds[i]);
  }

  const reviewIds = await createReviews(userIds, listingIds);

  for (let i = 0; i < reviewIds.length; i++) {
    testReviewIds.push(reviewIds[i]);
  }
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testListingIds,
  testOrderIds,
  testRatingIds,
  testReviewIds,
  testUserIds,
  testTokens,
};
