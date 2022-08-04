const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../utils/errors");
const Order = require("./order");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUserIds,
  testOrderIds,
  testListingIds,
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** Order.getOrdersByUserId */
describe("Test getOrdersByUserId", () => {
  test("Can successfully get orders by user id", async () => {
    const userId = testUserIds[0];
    const orders = await Order.getOrdersByUserId(userId);

    expect(orders[0]).toEqual({
      id: expect.any(Number),
      user_id: expect.any(Number),
      createdat: expect.any(Date),
      updatedat: expect.any(Date),
      fees: null,
      taxes: 5.99,
      total: 20.99,
      guests: 3,
      startdate: expect.any(Date),
      enddate: expect.any(Date),
      listing_id: expect.any(Number),
    });
  });

  test("Returns nothing if user doesn't exist", async () => {
    const orders = await Order.getOrdersByUserId(-1);
    expect(orders.length).toEqual(0);
  });

  test("Returns nothing if user doesn't have any orders", async () => {
    const userId = testUserIds[3];
    const orders = await Order.getOrdersByUserId(userId);
    expect(orders.length).toEqual(0);
  });
});
/************************************** Order.getOrderById */

describe("Test getOrderById", () => {
  test("Can successfully get an order by id", async () => {
    const orderId = testOrderIds[0];
    const order = await Order.getOrderById(orderId);

    expect(order[0]).toEqual({
      id: expect.any(Number),
      user_id: expect.any(Number),
      createdat: expect.any(Date),
      updatedat: expect.any(Date),
      fees: null,
      taxes: 5.99,
      total: 20.99,
      guests: 3,
      startdate: expect.any(Date),
      enddate: expect.any(Date),
      listing_id: expect.any(Number),
    });
  });

  test("Returns nothing if order doesn't exist", async () => {
    const order = await Order.getOrderById(-1);
    expect(order[0]).toBeFalsy();
  });
});
/************************************** Order.postOrder */

describe("Test postOrder", () => {
  test("Can successfully post an order", async () => {
    const listingId = testListingIds[0];
    const user = { id: testUserIds[1] };
    const orders = {
      taxes: 10.11,
      total: 10000,
      guests: 1000,
      startDate: 9 / 9 / 9,
      endDate: 10 / 10 / 10,
    };

    const order = await Order.postOrder({ listingId, orders, user });

    expect(order[0]).toEqual({
      id: expect.any(Number),
      taxes: 10.11,
      total: 10000,
      guests: 1000,
      user_id: expect.any(Number),
      listing_id: expect.any(Number),
      startdate: expect.any(Date),
      enddate: expect.any(Date),
      fees: null,
    });
  });

  test("Throws error if required field is missing", async () => {
    const listingId = testListingIds[0];
    const user = { id: testUserIds[1] };
    const orders = {
      guests: 1000,
      startDate: 9 / 9 / 9,
      endDate: 10 / 10 / 10,
    };

    try {
      await Order.postOrder({ listingId, orders, user });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test("Throws error if invalid field is provided", async () => {
    const listingId = testListingIds[0];
    const user = { id: testUserIds[1] };
    const orders = {
      taxes: 10.11,
      total: 10000,
      guests: 1000,
      endDate: 9 / 9 / 9,
      startDate: 10 / 10 / 10,
    };

    try {
      await Order.postOrder({ listingId, orders, user });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
