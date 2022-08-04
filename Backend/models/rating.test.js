const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../utils/errors");
  const Rating = require("./rating");
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


  /************************************** Rating.getRatingByListingId */
  describe("Test getRatingByListingId", () => {
    test("Can successfully get a listing's rating", async () => {

    })

    test("Returns nothing if listing has no rating", async () => {

    })

    test("Returns nothing if listing doesn't exist", async () => {

    })
  })

  /************************************** Rating.postRating */

  describe("Test postRating", () => {
    test("Can successfully post a new rating", async () => {

    })

    test("Throws bad request error if required field is missing", async () => {

    })

    test("Throws bad request error if invalid values provided", async () => {

    })
  })


 

 