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
  testListingIds,
  testUserIds,
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** Listing.getListings */
describe("Test getListings", () => {
  test("Returns all the listings in the database", async () => {
    const listings = await Listing.getListings();
    expect(listings.length).toEqual(13);
  });
});

/************************************** Listing.getListingById */

describe("Test getListingById", () => {
  test("Returns a listing by its id", async () => {
    const listingId = testListingIds[0];
    const listing = await Listing.getListingById(listingId);

    expect(listing[0]).toEqual({
      user_id: expect.any(Number),
      price: 20.99,
      location: "San Francisco, California",
      max_accomodation: 3,
      image_url:
        "https://cdn.motor1.com/images/mgl/Q12M1/s1/2021-tesla-model-s-plaid.jpg",
      model: "Model S",
      description:
        "5 Month old tesla, clean and in great condition, driving around not allowed",
      fees: 4.5,
      createdat: expect.any(Date),
      id: expect.any(Number),
      image_url2: null,
      image_url3: null,
      image_url4: null,
      image_url5: null,
      make : "Tesla",
      year: 2020,
      rating: null,
      updatedat: expect.any(Date),
    });
  });

  test("Returns nothing if id doesn't exist", async () => {
    const listing = await Listing.getListingById(-1);
    expect(listing[0]).toBeFalsy();
  });
});

/************************************** Listing.getUserListings */

describe("Test getUserListings", () => {
  test("Returns a user's listings", async () => {
    const userId = testUserIds[1];
    const listings = await Listing.getUserListings(userId);

    expect(listings.length).toEqual(6);
  });

  test("Returns no listings if a user has no listings", async () => {
    const userId = testUserIds[3];
    const listings = await Listing.getUserListings(userId);

    expect(listings.length).toEqual(0);
  });
});
/************************************** Listing.getBestListings */

describe("Test geBestListings", () => {
  test("Returns the 4 best listings in the database", async () => {
    const listings = await Listing.getBestListings();

    expect(listings.length).toEqual(4);
  });
});
/************************************** Listing.postListing */

describe("Test postListing", () => {
  test("Can successfully post a new listing", async () => {
    const listings = {
      price: 50,
      location: "Salesforce",
      max_accomodation: 4,
      model: "Mercedes",
      image_url: "mercedesurlgobrr",
      make : "mercmake",
      year : 2001
    };

    const user = {
      id: testUserIds[3],
    };

    const res = await Listing.postListing({ listings, user });

    expect(res[0]).toEqual({
      price: 50,
      location: "Salesforce",
      max_accomodation: 4,
      model: "Mercedes",
      user_id: expect.any(Number),
      make : "mercmake",
      year : 2001,
      description: null
    });
  });

  test("Throws bad request error if required field is missing", async () => {
    const listings = {
      max_accomodation: 4,
      model: "Mercedes",
      image_url: "mercedesurlgobrr",
    };

    const user = {
      id: testUserIds[3],
    };

    try {
      await Listing.postListing({ listings, user });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test("Throws bad request error if an invalid value is provided", async () => {
    const listings = {
      price: 50,
      location: "Salesforce",
      max_accomodation: 0,
      model: "Mercedes",
      image_url: "mercedesurlgobrr",
    };

    const user = {
      id: testUserIds[3],
    };

    try {
      await Listing.postListing({ listings, user });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** Listing.editListing */

describe("Test editListing", () => {
  test("Can successfully update an existing listing", async () => {
    const listingUpdate = {
      image_url: "updatedurl",
      description: "updateddescription",
    };
    const listingId = testListingIds[0];

    const listing = await Listing.editListing({ listingUpdate, listingId });

    expect(listing).toEqual({
      id: expect.any(Number),
      user_id: expect.any(Number),
      price: 20.99,
      location: "San Francisco, California",
      max_accomodation: 3,
      model: "Model S",
      description: "updateddescription",
      image_url: "updatedurl",
      fees: 4.5,
      createdat: expect.any(Date),
      updatedat: expect.any(Date),
    });
  });

  test("Throws bad request error if invalid field provided", async () => {
    const listingUpdate = {
      image_url: "",
    };
    const listingId = testListingIds[0];

    try {
      await Listing.editListing({ listingUpdate, listingId });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** Listing.deleteListing */

describe("Test deleteListing", () => {
  test("Can successfully delete a listing from the database", async () => {
    const listingId = testListingIds[0];
    await Listing.deleteListing(listingId);

    const listing = Listing.getListingById(listingId);

    expect(listing.model).toBeFalsy();
  });
});
