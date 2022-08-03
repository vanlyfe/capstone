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
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);




/************************************** GET /rating/:listingId */
describe("GET /rating/:listingId", () => {
  test("Authed user can view a listing's ratings", async () => {
    
  });

  test("Anonymous user can view a listing's ratings", async () => {
    
  });

  

});


/************************************** POST /rating/:listingId */

describe("POST /rating/:listingId", () => {
    test("Authed user can post a rating", async () => {

    })

    test("Throws forbidden error when authed user tries to rate their own listing", async () => {

    })

    test("Throws unauthorized error when anonymous user tries to post a rating", async () => {
        
    })
})
