const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testListingIds,
  testOrderIds,
  testReviewIds,
  testRatingIds,
  testUserIds,
} = require("../tests/common");
const { BadRequestError, ForbiddenError } = require("../utils/errors");
const permissions = require("./permissions");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


describe("profilePermissions", () => {
  describe("Test userOwnsProfile", () => {
    test("Throws error if user doesn't own the account", async () => {
      expect.assertions(2);

      const req = { params: { userId: testUserIds[2] } };
      const res = { locals: { user: { id: 0 } } };
      const next = (err) => expect(err).toBeTruthy();
      await permissions.userOwnsProfile(req, res, next);
    });
  });
});

describe("orderPermissions", () => {
  describe("Test userOwnsOrder", () => {
    test("Throws error if user doesn't own the order", async () => {
      expect.assertions(1);

      const req = { params: { orderId: testOrderIds[0] } };
      const res = { locals: { user: { id: 3 } } };
      const next = (err) => expect(err).toBeTruthy();
      await permissions.userOwnsOrder(req, res, next);
    });
  });
});

describe("listingPermissions", () => {
  describe("Test userOwnsListing", () => {
    test("Throws error if listing does not exist", async () => {
      expect.assertions(1);
      const res = { locals: { user: { id: 3 } } };
      const req = { params: { listingId: -1 } };
      const next = (err) => expect(err).toBeTruthy();
      await permissions.userOwnsListing(req, res, next);
    });

    test("Throws error if user doesn't own the listing", async () => {
      expect.assertions(1);
      const res = { locals: { user: { id: testUserIds[0] } } };
      const req = { params: { listingId: testListingIds[4] } };
      const next = (err) => expect(err).toBeTruthy();
      await permissions.userOwnsListing(req, res, next);
    });
  })

  describe("Test userIsNotListingOwner", () => {
    test("Throws error if user owns the listing", async () => {
        expect.assertions(2);
      const res = { locals: { user: { id: testUserIds[5] } } };
      const req = { params: { listingId: testListingIds[4] } };
      const next = (err) => expect(err).toBeTruthy();
      await permissions.userIsNotListingOwner(req, res, next);

    })
  })
});


describe("reviewPermissions", () => {
    describe("Test userOwnsReview", () => {
        test("Throws error if user does not own the review", async () =>{
            expect.assertions(1);
            const res = { locals: { user: { id: testUserIds[1] } } };
            const req = { params: { reviewId: testReviewIds[2] } };
            const next = (err) => expect(err).toBeTruthy();
            await permissions.userOwnsReview(req, res, next);
        })
    })
})
