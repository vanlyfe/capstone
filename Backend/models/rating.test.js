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
  testListingIds,
  testUserIds,
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** Rating.getRatingByListingId */
describe("Test getRatingByListingId", () => {
  test("Can successfully get a listing's rating", async () => {
    const listingId = testListingIds[4];
    const rating = await Rating.getRatingByListingId(listingId);

    expect(rating[0].avg).toEqual(3);
  });

  test("Returns nothing if listing has no rating", async () => {
    const listingId = testListingIds[12];
    const rating = await Rating.getRatingByListingId(listingId);

    expect(rating[0].avg).toBeFalsy();
  });

  test("Returns nothing if listing doesn't exist", async () => {
    const rating = await Rating.getRatingByListingId(-1);

    expect(rating[0].avg).toBeFalsy();
  });
});

/************************************** Rating.postRating */

describe("Test postRating", () => {
  test("Can successfully post a new rating", async () => {
    const listingId = testListingIds[0];

    const user = { id: testUserIds[1] };
    const ratings = { rating: 4.5 };

    const rating = await Rating.postRating({ listingId, ratings, user });

    expect(rating[0]).toEqual({
      id: expect.any(Number),
      rating: 4.5,
      listing_id: expect.any(Number),
      user_id: expect.any(Number),
    });
  });

  test("Throws bad request error if required field is missing", async () => {
    const listingId = testListingIds[0];

    const user = { id: testUserIds[1] };
    const ratings = {};

    try {
      await Rating.postRating({ listingId, ratings, user });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test("Throws bad request error if invalid values provided", async () => {
    const listingId = testListingIds[0];

    const user = { id: testUserIds[1] };
    const ratings = { rating: 10 };

    try {
      await Rating.postRating({ listingId, ratings, user });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
