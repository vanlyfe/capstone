const request = require("supertest");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTokens,
  testRatingIds,
  testUserIds,
  testListingIds,
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /rating/:listingId */
describe("GET /rating/:listingId", () => {
  test("Authed user can view a listing's ratings", async () => {
    const listingId = testListingIds[4];

    const res = await request(app)
      .get(`/rating/${listingId}`)
      .set("authorization", `Bearer ${testTokens.vernonToken}`);

    expect(res.statusCode).toEqual(200);

    const { rating } = res.body;

    expect(rating[0].avg).toEqual(expect.any(Number));
  });

  test("Anonymous user can view a listing's ratings", async () => {
    const listingId = testListingIds[4];

    const res = await request(app).get(`/rating/${listingId}`);

    expect(res.statusCode).toEqual(200);

    const { rating } = res.body;

    expect(rating[0].avg).toEqual(expect.any(Number));
  });
});

/************************************** POST /rating/:listingId */

describe("POST /rating/:listingId", () => {
  test("Authed user can post a rating", async () => {
    const listingId = testListingIds[1];

    const res = await request(app)
      .post(`/rating/${listingId}`)
      .set("authorization", `Bearer ${testTokens.ammarToken}`)
      .send({ rating: 3.9 });
    expect(res.statusCode).toEqual(200);


    const { rating } = res.body;
    

    expect(rating[0]).toEqual({
        user_id : expect.any(Number),
        listing_id : expect.any(Number),
        id : expect.any(Number),
        rating : 3.9
    });
  });


  test("Throws forbidden error when authed user tries to rate their own listing", async () => {
    const listingId = testListingIds[1];

    const res = await request(app)
      .post(`/rating/${listingId}`)
      .set("authorization", `Bearer ${testTokens.vernonToken}`)
      .send({ rating: 3.9 });
    expect(res.statusCode).toEqual(403);
  });

  test("Throws unauthorized error when anonymous user tries to post a rating", async () => {
    const listingId = testListingIds[1];

    const res = await request(app)
      .post(`/rating/${listingId}`)
      .send({ rating: 3.9 });
    expect(res.statusCode).toEqual(401);
  });
});
