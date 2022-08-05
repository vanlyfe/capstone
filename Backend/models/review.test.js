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
  testListingIds,
  testUserIds,
  testReviewIds,
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** Review.getReviewsByListingId */
describe("Test getReviewsByListingId", () => {
  test("Can successfully fetch all reviews for a listing", async () => {
    const listingId = testListingIds[1];
    const reviews = await Review.getReviewsByListingId(listingId);
    expect(reviews.length).toEqual(2);
  });

  test("Returns nothing if listingid doesn't exist", async () => {
    const reviews = await Review.getReviewsByListingId(-1);

    expect(reviews.length).toEqual(0);
  });

  test("Returns nothing if listing has no reviews", async () => {
    const listingId = testListingIds[12];

    const reviews = await Review.getReviewsByListingId(listingId);

    expect(reviews.length).toEqual(0);
  });
});

/************************************** Review.getReviewsByUserId */
describe("Test getReviewsByUserId", () => {
  test("Returns all reviews for a user", async () => {
    const userId = testUserIds[1];
    const reviews = await Review.getReviewsByUserId(userId);
    expect(reviews.length).toEqual(4);
  });

  test("Returns nothing if user doesn't exist", async () => {
    const reviews = await Review.getReviewsByUserId(-1);
    expect(reviews.length).toEqual(0);
  });

  test("Returns nothing if user has no reviews", async () => {
    const userId = testUserIds[3];
    const reviews = await Review.getReviewsByUserId(userId);
    expect(reviews.length).toEqual(0);
  });
});

/************************************** Review.postReview */
describe("Test postReview", () => {
  test("Successfully post a new review", async () => {
    const listingId = testListingIds[0];
    const reviews = {
      review: "Just making a cool review",
    };

    const user = {
      id: testUserIds[2],
    };

    const review = await Review.postReview({ listingId, reviews, user });
    expect(review[0]).toEqual({
      id: expect.any(Number),
      listing_id: expect.any(Number),
      user_id: expect.any(Number),
      review: "Just making a cool review",
    });
  });

  test("Throws bad request error if required field is missing", async () => {
    const listingId = testListingIds[0];
    const reviews = {};

    const user = {
      id: testUserIds[2],
    };

    try {
      await Review.postReview({ listingId, reviews, user });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test("Throws bad request error if invalid review provided", async () => {
    const listingId = testListingIds[0];
    const reviews = {
      review: "",
    };

    const user = {
      id: testUserIds[2],
    };

    try {
      await Review.postReview({ listingId, reviews, user });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** Review.editReview */
describe("Test editReview", () => {
  test("Can successfully edit a review", async () => {
    const reviewUpdate = {
      review: "An updated review",
    };

    const reviewId = testReviewIds[0];

    const review = await Review.editReview({ reviewUpdate, reviewId });
    expect(review).toEqual({
      id: expect.any(Number),
      review: "An updated review",
      createdat: expect.any(Date),
      updatedat: expect.any(Date),
      listing_id: expect.any(Number),
      user_id: expect.any(Number),
    });
  });

  test("Throws bad request error if invalid review given", async () => {
    const reviewUpdate = {
      review: "",
    };

    const reviewId = testReviewIds[0];

    try {
      await Review.editReview({ reviewUpdate, reviewId });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
