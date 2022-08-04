const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../utils/errors");
const User = require("./user");
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

/************************************** User.login */

describe("Test login", () => {
  test("User can login successfully with proper credentials", async () => {
    const user = await User.login({
      email: "etsehay@salesforce.com",
      password: "password",
    });

    expect(user).toEqual({
      id: expect.any(Number),
      username: "etsehay",
      firstName: "Edilawit",
      lastName: "Tsehay",
      email: "etsehay@salesforce.com",
      birthdate: expect.any(Date),
      createdAt: expect.any(Date),
    });
  });

  test("Unknown email throw unauthorized error", async () => {
    try {
      await User.login({ email: "somebody@else.io", password: "password" });
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test("Invalid credentials throw unauthorized error", async () => {
    expect.assertions(1);

    try {
      await User.login({ email: "etsehay@salesforce.com", password: "wrong" });
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/************************************** User.register */

describe("Test register", () => {
  const newUser = {
    username: "new",
    firstName: "Test",
    lastName: "Tester",
    email: "test@test.io",
    password: "password",
    birthdate: "9/9/2000",
  };

  test("User can successfully register with proper credentials", async () => {
    const user = await User.register({ ...newUser });
    expect(user).toEqual({
      id: expect.any(Number),
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      birthdate: expect.any(Date),
      createdAt: expect.any(Date),
    });
  });

  test("Registering with duplicate email throws error", async () => {
    newUser.email = "votieno@salesforce.com";

    try {
      await User.register({
        ...newUser,
      });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test("Registering with duplicate username throws error", async () => {
    newUser.username = "jbosire";

    try {
      await User.register({
        ...newUser,
      });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test("Throws bad request error if registering with invalid email", async () => {});

  test("Throws bad request error if required credentials are missing", async () => {});

  test("Throw bad request error if younger than 18", async () => {});
});

/************************************** User.getUserRating */

describe("Test getUserRating", () => {
  test("Returns average of user's listings ratings", async () => {});

  test("Returns nothing if invalid id", async () => {});
});

/************************************** User.fetchUserByEmail */

describe("Test fetchUserByEmail", () => {
  test("Can fetch a user by email", async () => {});

  test("Unknown email returns nothing", async () => {});

  test("Throws bad request error if invalid email", async () => {});
});

/************************************** User.fetchUserById */

describe("Test fetchUserById", () => {
  test("Can fetch a user by id", async () => {});

  test("Unknown id returns nothing", async () => {});
});

/************************************** User.checkUsername */

describe("Test checkUsername", () => {
  test("Can fetch a user by username", async () => {});

  test("Unknown username returns nothing", async () => {});
});

/************************************** User.editUser */
describe("Test editUser", () => {
  test("User can successfully edit their profile", async () => {});

  test("Throws bad request error if invalid email provided", async () => {});

  test("Throws bad request error if duplicate email", async () => {});

  test("Throws bad request error if duplicate username", async () => {});

  test("Throws bad request error if invalid credentials provided", async () => {});
});

/************************************** User.deleteUser */
describe("Test deleteUser", () => {
  test("User can successfully delete account", async () => {});
});

/************************************** User.authenricatebirthdate */
describe("Test authenticateBirthdate", () => {
  test("Throws bad request error if birthdate is less than 18 years ago", async () => {});
});

//   /************************************** fetchUserByEmail */

//   describe("Test fetchUserByEmail", () => {
//     test("Can fetch a user by email", async () => {
//       const user = await User.fetchUserByEmail("lebron@james.io")
//       expect(user).toEqual({
//         id: expect.any(Number),
//         username: "lebron",
//         first_name: "LeBron",
//         last_name: "James",
//         email: "lebron@james.io",
//         is_admin: false,
//         password: expect.any(String),
//         created_at: expect.any(Date),
//       })
//     })

//     test("Unknown email returns nothing", async () => {
//       const user = await User.fetchUserByEmail("wrong@nope.nope")
//       expect(user).toBeFalsy()
//     })
//   })

//   /************************************** fetchUserByUsername */

//   describe("Test fetchUserByUsername", () => {
//     test("Can fetch a user by username", async () => {
//       const user = await User.fetchUserByUsername("lebron")
//       expect(user).toEqual({
//         id: expect.any(Number),
//         username: "lebron",
//         first_name: "LeBron",
//         last_name: "James",
//         email: "lebron@james.io",
//         is_admin: false,
//         password: expect.any(String),
//         created_at: expect.any(Date),
//       })
//     })

//     test("Unknown username returns nothing", async () => {
//       expect.assertions(1)

//       const user = await User.fetchUserByUsername("unknown")
//       expect(user).toBeFalsy()
//     })
//   })
