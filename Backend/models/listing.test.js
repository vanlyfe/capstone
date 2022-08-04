const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../utils/errors");
  const Listing = require("./listing");
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

/************************************** Listing.getListings */
descibe("Test getListings", () => {
    test("Returns all the listings in the database", async () => {

    })
})


/************************************** Listing.getListingById */

describe("Test getListingById", () => {
    test("Returns a listing by its id", async () =>{

    })

    test("Returns nothign if id doesn't exist", async () => {

    })
})

/************************************** Listing.getUserListings */

describe("Test getUserListings", () => {
    test("Returns a user's listings", async () =>{

    })

    test("Returns nothing if a user has no listings", async () =>{

    })
})
/************************************** Listing.getBestListings */

descibe("Test geBestListings", () => {
    test("Returns the 4 best listings in the database", async () => {

    })
})
/************************************** Listing.postListing */

describe("Test postListing", () =>{
    test("Can successfully post a new listing", async () => {

    })

    test("Throws bad request error if required field is missing", async () => {

    })

    test("Throws bad request error if an invalid value is provided", async () => {

    })
})
/************************************** Listing.editListing */

descibe("Test editListing", () => {
    test("Can successfully update an existing listing", async () => {

    })

    test("Throws bad request error if invalid field provided", async () => {

    })
})
/************************************** Listing.deleteListing */

describe("Test deleteListing", () => {
    test("Can successfully delete a listing from the database", async () => {

    })
})

 


 
 