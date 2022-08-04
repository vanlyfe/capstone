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
  } = require("../tests/common");
  
  beforeAll(commonBeforeAll);
  beforeEach(commonBeforeEach);
  afterEach(commonAfterEach);
  afterAll(commonAfterAll);

  /************************************** Order.getOrdersByUserId */
  describe("Test getOrdersByUserId", () => {
    test("Can successfully get orders by user id", async () =>{

    })

    test("Returns nothing if user doesn't exist", async () => {

    })

    test("Returns nothing if user doesn't have any orders", async () => {

    })
  })
  /************************************** Order.getOrderById */

  describe("Test getOrderById", () => {
    test("Can successfully get an order by id", async () => {

    })

    test("Returns nothing if order doesn't exist", async () => {

    })
  })
  /************************************** Order.postOrder */

  describe("Test postOrder", () => {
    test("Can successfully post an order", async () => {

    })

    test("Throws error if required field is missing", async () => {

    })

    test("Throws error if invalid field is provided", async () => {

    })
  })

  