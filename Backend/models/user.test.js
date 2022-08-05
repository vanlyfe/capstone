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
  testUserIds,
} = require("../tests/common");
const { authenticateBirthdate } = require("./user");

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
      image_url : "https://i.natgeofe.com/n/0652a07e-42ed-4f3d-b2ea-0538de0c5ba3/seattle-travel_3x2.jpg",
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
      image_url : null,
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

  test("Throws bad request error if registering with invalid email", async () => {
    newUser.email = "newemailemail";
    newUser.username = "newusername";

    try {
      await User.register({ ...newUser });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test("Throws bad request error if required credentials are missing", async () => {
    try {
      await User.register({ firstName: "Joram", lastName: "Bosire" });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test("Throw bad request error if younger than 18", async () => {
    newUser.email = "newemailemail";
    newUser.username = "newusername";
    newUser.birthdate = "12/12/12";

    try {
      await User.register({ ...newUser });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** User.getUserRating */

describe("Test getUserRating", () => {
  test("Returns average of user's listings ratings", async () => {
    const userId = testUserIds[1];
    const rating = await User.getUserRating(userId);
    expect(rating.avg).toEqual(expect.any(Number));
  });

  test("Returns nothing if invalid id", async () => {
    const rating = await User.getUserRating(-1);
    expect(rating).toBeFalsy();
  });
});

/************************************** User.fetchUserByEmail */

describe("Test fetchUserByEmail", () => {
  test("Can fetch a user by email", async () => {
    const user = await User.fetchUserByEmail("jbosire@salesforce.com");
    expect(user).toEqual({
      id: expect.any(Number),
      username: "jbosire",
      firstname: "Joram",
      lastname: "Bosire",
      email: "jbosire@salesforce.com",
      image_url:
        "https://a.cdn-hotels.com/gdcs/production92/d1580/9a28fc70-9bea-11e8-a1b5-0242ac110053.jpg",
      password: expect.any(String),
      createdat: expect.any(Date),
      birthdate: expect.any(Date),
      updatedat: expect.any(Date),
      gender: "male",
      location: null,
      bio: null,
      rating: null,
      phone: null,
    });
  });

  test("Unknown email returns nothing", async () => {
    const user = await User.fetchUserByEmail("unknown@unknown.com");

    expect(user).toBeFalsy();
  });

  test("Throws bad request error if invalid email", async () => {
    try {
      const user = await User.fetchUserByEmail("unknownunknown.com");
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** User.fetchUserById */

describe("Test fetchUserById", () => {
  test("Can fetch a user by id", async () => {
    const userId = testUserIds[3];
    const user = await User.fetchUserById(userId);
    expect(user).toEqual({
      id: expect.any(Number),
      username: "jbosire",
      firstname: "Joram",
      lastname: "Bosire",
      email: "jbosire@salesforce.com",
      image_url:
        "https://a.cdn-hotels.com/gdcs/production92/d1580/9a28fc70-9bea-11e8-a1b5-0242ac110053.jpg",
      password: expect.any(String),
      createdat: expect.any(Date),
      birthdate: expect.any(Date),
      updatedat: expect.any(Date),
      gender: "male",
      location: null,
      bio: null,
      rating: null,
      phone: null,
    });
  });

  test("Unknown id returns nothing", async () => {
    try {
      await User.fetchUserById(-1);
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy;
    }
  });
});

/************************************** User.checkUsername */

describe("Test checkUsername", () => {
  test("Can fetch a user by username", async () => {
    const user = await User.checkUsername("jbosire");
    expect(user).toEqual({
      id: expect.any(Number),
      username: "jbosire",
      firstname: "Joram",
      lastname: "Bosire",
      email: "jbosire@salesforce.com",
      image_url:
        "https://a.cdn-hotels.com/gdcs/production92/d1580/9a28fc70-9bea-11e8-a1b5-0242ac110053.jpg",
      password: expect.any(String),
      createdat: expect.any(Date),
      birthdate: expect.any(Date),
      updatedat: expect.any(Date),
      gender: "male",
      location: null,
      bio: null,
      rating: null,
      phone: null,
    });
  });

  test("Unknown username returns nothing", async () => {
    try {
      await User.checkUsername("notausername");
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** User.editUser */
describe("Test editUser", () => {
  test("User can successfully edit their profile", async () => {
    const userUpdate = { firstName: "Notjoram", lastName: "Notbosire" };
    const userId = testUserIds[3];

    const user = await User.editUser({ userUpdate, userId });

    // id,firstName,lastName,email,username,location, birthdate, gender, createdAt, updatedAt;

    expect(user).toEqual({
      id: expect.any(Number),
      username: "jbosire",
      firstname: "Notjoram",
      lastname: "Notbosire",
      email: "jbosire@salesforce.com",
      createdat: expect.any(Date),
      birthdate: expect.any(Date),
      updatedat: expect.any(Date),
      image_url: "https://a.cdn-hotels.com/gdcs/production92/d1580/9a28fc70-9bea-11e8-a1b5-0242ac110053.jpg",
      gender: "male",
      location: null,
      rating: null,
    });
  });

  test("Throws bad request error if invalid email provided", async () => {
    try {
      const userUpdate = { email: "bademail" };
      const userId = testUserIds[3];
      await User.editUser({ userUpdate, userId });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test("Throws bad request error if duplicate email", async () => {
    try {
      const userUpdate = { email: "afakih@salesforce.com" };
      const userId = testUserIds[3];
      await User.editUser({ userUpdate, userId });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test("Throws bad request error if duplicate username", async () => {
    try {
      const userUpdate = { username: "votieno" };
      const userId = testUserIds[3];
      await User.editUser({ userUpdate, userId });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test("Throws bad request error if invalid credentials provided", async () => {
    try {
      const userUpdate = { username: "" };
      const userId = testUserIds[3];
      await User.editUser({ userUpdate, userId });
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** User.deleteUser */
describe("Test deleteUser", () => {
  test("User can successfully delete account", async () => {
    await User.deleteUser(testUserIds[3]);

    const user = await User.fetchUserByEmail("jbosire@salesforce.com");

    expect(user).toBeFalsy();
  });
});

/************************************** User.authenricatebirthdate */
describe("Test authenticateBirthdate", () => {
  test("Throws bad request error if birthdate is less than 18 years ago", async () => {
    try {
      User.authenticateBirthdate(12 / 12 / 12);
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
