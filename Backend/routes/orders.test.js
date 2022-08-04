const request = require("supertest");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTokens,
  testOrderIds,
  testUserIds,
  testListingIds,
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /order/user/:userId */
describe("GET /order/user/:userId", () => {
  test("Authed user can view own orders", async () => {
    const userId = testUserIds[1];
    const res = await request(app)
      .get(`/order/user/${userId}`)
      .set("authorization", `Bearer ${testTokens.vernonToken}`);

    expect(res.statusCode).toEqual(200);
    const { orders } = res.body;
    expect(orders[0]).toEqual({
      user_id: expect.any(Number),
      taxes: 10.99,
      total: 25.0,
      guests: 2,
      listing_id: expect.any(Number),
      startdate: expect.any(String),
      enddate: expect.any(String),
      updatedat: expect.any(String),
      createdat: expect.any(String),
      fees: null,
      id: expect.any(Number),
    });
  });

  test("Throws forbidden error when authed user tries to view other user's orders", async () => {
    const userId = testUserIds[1];
    const res = await request(app)
      .get(`/order/user/${userId}`)
      .set("authorization", `Bearer ${testTokens.ammarToken}`);

    expect(res.statusCode).toEqual(403);
  });

  test("Throws unauthorized error when anonymous user tries to view orders", async () => {
    const userId = testUserIds[1];
    const res = await request(app).get(`/order/user/${userId}`);

    expect(res.statusCode).toEqual(401);
  });
});

/************************************** GET /order/:orderId */
describe("GET /order/:orderId", () => {
  test("Authed user can view own order", async () => {
    const orderId = testOrderIds[0];
    const res = await request(app)
      .get(`/order/${orderId}`)
      .set("authorization", `Bearer ${testTokens.ammarToken}`);

    expect(res.statusCode).toEqual(200);

    const { order } = res.body;

    expect(order[0]).toEqual({
      user_id: expect.any(Number),
      taxes: 5.99,
      total: 20.99,
      guests: 3,
      listing_id: expect.any(Number),
      startdate: expect.any(String),
      enddate: expect.any(String),
      updatedat: expect.any(String),
      createdat: expect.any(String),
      fees: null,
      id: expect.any(Number),
    });
  });

  test("Throws forbidden error when authed user tries to view other user's order", async () => {
    const orderId = testOrderIds[0];
    const res = await request(app)
      .get(`/order/${orderId}`)
      .set("authorization", `Bearer ${testTokens.edilToken}`);

    expect(res.statusCode).toEqual(403);
  });

  test("Throws unauthorized error when anonymous user tries to view an order", async () => {
    const orderId = testOrderIds[0];
    const res = await request(app).get(`/order/${orderId}`);

    expect(res.statusCode).toEqual(401);
  });
});

// /************************************** POST /order/:listingId */

describe("POST /order/:listingId", () => {
  test("Authed user can make an order", async () => {
    const listingId = testListingIds[0];
    const res = await request(app)
      .post(`/order/${listingId}`)
      .set("authorization", `Bearer ${testTokens.edilToken}`)
      .send({
        taxes: 15.22,
        guests: 3,
        startDate: "5/9/9",
        endDate: "9/9/9",
        total: 50,
      });

    expect(res.statusCode).toEqual(200);

    const { order } = res.body;

    expect(order[0]).toEqual({
      id: expect.any(Number),
      taxes: 15.22,
      total: 50,
      guests: 3,
      user_id: expect.any(Number),
      listing_id: expect.any(Number),
      startdate: expect.any(String),
      enddate: expect.any(String),
      fees: null,
    });
  });

  test("Throws unauthorized error when anonymous user tries to create an order", async () => {
    const listingId = testListingIds[0];
    const res = await request(app)
      .post(`/order/${listingId}`)
      .send({ taxes: 15.22, guests: 3, startDate: "5/9/9", endDate: "9/9/9" });

    expect(res.statusCode).toEqual(401);
  });

  test("Throws forbidden error when authed user tries to order own listing", async () => {
    const listingId = testListingIds[0];
    const res = await request(app)
      .post(`/order/${listingId}`)
      .set("authorization", `Bearer ${testTokens.vernonToken}`)
      .send({ taxes: 15.22, guests: 3, startDate: "5/9/9", endDate: "9/9/9" });

    expect(res.statusCode).toEqual(403);
  });
});
