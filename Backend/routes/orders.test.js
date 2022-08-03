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
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);




/************************************** GET /order/user/:userId */
describe("GET /order/user/:userId", () => {
  test("Authed user can view own orders", async () => {
    
  });

  test("Throws forbidden error when authed user tries to view other user's orders", async () => {
    
  });

  test("Throws unauthorized error when anonymous user tries to view orders", async () => {
    
});

});


/************************************** GET /order/:orderId */
describe("GET /order/:orderId", () => {
    test("Authed user can view own order", async () => {

    })

    test("Throws forbidden error when authed user tries to view other user's order", async () => {

    })

    test("Throws unauthorized error when anonymous user tries to view an order", async () => {

    })
})

/************************************** POST /order/:listingId */

describe("POST /order/:listingId", () => {
    test("Authed user can make an order", async () => {

    })

    test("Throws unauthorized error when anonymous user tries to create an order", async () => {

    })

    test("Throws forbidden error when authed user tries to order own listing", async () => {

    })
})









