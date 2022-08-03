const request = require("supertest");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTokens,
  testReviewIds,
  testUserIds,
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);




/************************************** GET /review/:listingId */
describe("GET /review/:listingId", () => {
  test("Authed user can fetch a listing's reviews", async () => {
    
  });

  test("Anonymous user can fetch a listing's reviews", async () => {
    
  });

});

/************************************** GET /review/user/:userId */

describe("GET /review/user/:userId", () => {
  test("Authed user can fetch a user's reviews", async () => {
    
  });

  test("Anonymous user can fetch a user's reviews", async () => {
    
  });

});


/************************************** POST /review/:listingId */

describe("POST /review/:listingId", () => {
  test("Authed user can POST a review", async () => {
    
  });

  test("Throws forbidden error when authed user tries to review their own listing", async () => {
    
  });

  test("Throws unauthorized error when anonymous user tries to review a listing", async () => {
    
  });

});


/************************************** PUT /review/:reviewId */

describe("PUT /review/:reviewId", () => {
  test("Authed user can update their review", async () => {
    
  });

  test("Throws forbidden error when authed user tries to update other user's review", async () => {
    
  });

  test("Throws unauthorized error when anonymous user tries to update a review", async () => {
    
  });

});


/************************************** DELETE /review/:reviewId */

describe("DELETE /review/:reviewId", () => {
  test("Authed user can delete their review", async () => {
    
  });

  test("Throws forbidden error when authed user tries to delete other user's review", async () => {
    
  });

  test("Throws unauthorized error when anonymous user tries to delete a review", async () => {
    
  });

});