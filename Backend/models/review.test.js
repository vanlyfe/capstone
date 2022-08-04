const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../utils/errors");
  const Review = require("./review");
  const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
  } = require("../tests/common");
  
  beforeAll(commonBeforeAll);
  beforeEach(commonBeforeEach);
  afterEach(commonAfterEach);
  afterAll(commonAfterAll);


  /************************************** Review.getReviewsByListingId */
  describe("Test getReviewsByListingId", () => {
    test("Can successfully fetch all reviews for a listing", async () => {

    })

    test("Returns nothig if listingid doesn't exist", async () => {

    })

    test("Returns nothing if listing has no reviews", async () => {

    })
  })

  /************************************** Review.getReviewsByUserId */
  describe("Test getReviewsByUserId", () => {
    test("Returns all reviews for a user", async () => {

    })

    test("Returns nothing if user doesn't exist", async () => {

    })

    test("Returns nothing if user has no reviews", async () => {

    })
  })

  /************************************** Review.postReview */
  describe("Test postReview", () => {
    test("Successfully post a new review", async () => {

    })

    test("Throws bad request error if required field is missing", async () => {

    })

    test("Throws bad request error if invalid review provided", async () => {
    })
  })

  /************************************** Review.editReview */
  describe("Test editReview", () => {
    test("Can successfully edit a review", async () => {

    })

    test("Throws bad request error if invalid review given", async () => {

    })
  })
  /************************************** Review.deleteReview */

  describe("Test deleteReview", () => {
    test("Can successfully delete a review", async () => {

    })
  })

 


