const request = require("supertest");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTokens,
  testReviewIds,
  testListingIds,
  testUserIds,
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /review/:listingId */
describe("GET /review/:listingId", () => {
  test("Authed user can fetch a listing's reviews", async () => {
    const listingId = testListingIds[0];

    const res = await request(app)
      .get(`/review/${listingId}`)
      .set("authorization", `Bearer ${testTokens.ammarToken}`);

    expect(res.statusCode).toEqual(200);
    const { reviews } = res.body;
    expect(reviews[0]).toEqual({
      createdat: expect.any(String),
      updatedat: expect.any(String),
      listing_id: expect.any(Number),
      id: expect.any(Number),
      user_id: expect.any(Number),
      review: "Noisy neighbourhood with constant fireworks and very insecure",
    });
  });

  test("Anonymous user can fetch a listing's reviews", async () => {
    const listingId = testListingIds[0];

    const res = await request(app).get(`/review/${listingId}`);

    expect(res.statusCode).toEqual(200);
    const { reviews } = res.body;
    expect(reviews[0]).toEqual({
      createdat: expect.any(String),
      updatedat: expect.any(String),
      listing_id: expect.any(Number),
      id: expect.any(Number),
      user_id: expect.any(Number),
      review: "Noisy neighbourhood with constant fireworks and very insecure",
    });
  });
});

/************************************** GET /review/user/:userId */

describe("GET /review/user/:userId", () => {
  test("Authed user can fetch a user's reviews", async () => {
    const userId = testUserIds[1];
    const res = await request(app)
      .get(`/review/user/${userId}`)
      .set("authorization", `Bearer ${testTokens.ammarToken}`);

    expect(res.statusCode).toEqual(200);
    var { reviews } = res.body;

    expect(reviews.length).toEqual(4);
  });

  test("Anonymous user can fetch a user's reviews", async () => {
    const userId = testUserIds[1];
    const res = await request(app).get(`/review/user/${userId}`);

    expect(res.statusCode).toEqual(200);
    var { reviews } = res.body;

    expect(reviews.length).toEqual(4);
  });
});

/************************************** POST /review/:listingId */

describe("POST /review/:listingId", () => {
  test("Authed user can POST a review", async () => {
    const listingId = testListingIds[0];
    const review = { review: "Cool car you got man" };

    const res = await request(app)
      .post(`/review/${listingId}`)
      .set("authorization", `Bearer ${testTokens.ammarToken}`)
      .send({ review });

    expect(res.statusCode).toEqual(200);

    const rev = res.body.review[0];

    expect(rev).toEqual({
      id: expect.any(Number),
      listing_id: expect.any(Number),
      user_id: expect.any(Number),
      review: expect.any(String),
    });
  });

  test("Throws forbidden error when authed user tries to review their own listing", async () => {
    const listingId = testListingIds[0];
    const review = { review: "Cool car you got man" };

    const res = await request(app)
      .post(`/review/${listingId}`)
      .set("authorization", `Bearer ${testTokens.vernonToken}`)
      .send({ review });

    expect(res.statusCode).toEqual(403);
  });

  test("Throws unauthorized error when anonymous user tries to review a listing", async () => {
    const listingId = testListingIds[0];
    const review = { review: "Cool car you got man" };

    const res = await request(app)
      .post(`/review/${listingId}`)
      .send({ review });

    expect(res.statusCode).toEqual(401);
  });
});

/************************************** PUT /review/:reviewId */

describe("PUT /review/:reviewId", () => {
  test("Authed user can update their review", async () => {
    const reviewId = testReviewIds[0];

    const res = await request(app)
      .put(`/review/${reviewId}`)
      .set("authorization", `Bearer ${testTokens.edilToken}`)
      .send({ review: "Check out this review update" });

    expect(res.statusCode).toEqual(200);

    const { review } = res.body;

    expect(review).toEqual({
      createdat: expect.any(String),
      id: expect.any(Number),
      listing_id: expect.any(Number),
      user_id: expect.any(Number),
      updatedat: expect.any(String),
      review: "Check out this review update",
    });
  });

  test("Throws forbidden error when authed user tries to update other user's review", async () => {
    const reviewId = testReviewIds[0];

    const res = await request(app)
      .put(`/review/${reviewId}`)
      .set("authorization", `Bearer ${testTokens.ammarToken}`)
      .send({ review: "Check out this review update" });

    expect(res.statusCode).toEqual(403);
  });

  test("Throws unauthorized error when anonymous user tries to update a review", async () => {
    const reviewId = testReviewIds[0];

    const res = await request(app)
      .put(`/review/${reviewId}`)
      .send({ review: "Check out this review update" });

    expect(res.statusCode).toEqual(401);
  });
});

/************************************** DELETE /review/:reviewId */

describe("DELETE /review/:reviewId", () => {
  test("Authed user can delete their review", async () => {
    const reviewId = testReviewIds[0];

    const res = await request(app)
      .delete(`/review/${reviewId}`)
      .set("authorization", `Bearer ${testTokens.edilToken}`);

    expect(res.statusCode).toEqual(200);
  });

  test("Throws forbidden error when authed user tries to delete other user's review", async () => {
    const reviewId = testReviewIds[0];

    const res = await request(app)
      .delete(`/review/${reviewId}`)
      .set("authorization", `Bearer ${testTokens.vernonToken}`);

    expect(res.statusCode).toEqual(403);
  });

  test("Throws unauthorized error when anonymous user tries to delete a review", async () => {
    const reviewId = testReviewIds[0];

    const res = await request(app).delete(`/review/${reviewId}`);

    expect(res.statusCode).toEqual(401);
  });
});
