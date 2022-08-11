const request = require("supertest");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTokens,
  testUserIds,
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /auth/token */

describe("POST /auth/login", () => {
  test("User can login successfully with valid credentials", async () => {
    const res = await request(app).post("/auth/login/").send({
      email: "afakih@salesforce.com",
      password: "password",
    });
    expect(res.body).toEqual({
      token: expect.any(String),
      user: {
        id: expect.any(Number),
        username: "afakih",
        firstName: "Ammar",
        lastName: "Fakih",
        email: "afakih@salesforce.com",
        image_url:
          "https://www.fodors.com/wp-content/uploads/2022/04/jake-blucker-8LlJNFLTEm0-unsplash.jpg",
        birthdate: expect.any(String),
        createdAt: expect.any(String),
      },
    });
  });

  test("Throws unauthorized error when user provides wrong password", async () => {
    const res = await request(app).post("/auth/login/").send({
      email: "votieno@salesforce.com",
      password: "nope",
    });
    expect(res.statusCode).toEqual(401);
  });

  test("Throws Bad Request error when user doesn't provide password", async () => {
    const res = await request(app).post("/auth/login/").send({
      email: "etsehay@salesforce.com",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Throws Bad Request error when user doesn't provide email", async () => {
    const res = await request(app).post("/auth/login/").send({
      password: "password",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Throws unauthorized error when user provides wrong email", async () => {
    const res = await request(app).post("/auth/login/").send({
      email: "voeno@salesforce.com",
      password: "password",
    });
    expect(res.statusCode).toEqual(401);
  });
});

//   /************************************** POST /auth/register */
describe("POST /auth/register", () => {
  test("Allows user to register with valid credentials", async () => {
    const res = await request(app)
      .post("/auth/register/")
      .send({
        username: "new",
        firstName: "first",
        lastName: "last",
        password: "pw",
        email: "new@email.com",
        birthdate: new Date("9/9/1999"),
      });
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual({
      token: expect.any(String),
      user: {
        id: expect.any(Number),
        username: "new",
        firstName: "first",
        lastName: "last",
        email: "new@email.com",
        createdAt: expect.any(String),
        birthdate: expect.any(String),
        image_url: null,
      },
    });
  });

  test("Throws Bad Request error when user doesn't provide all fields", async () => {
    const res = await request(app).post("/auth/register/").send({
      username: "new",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("Throws Bad Request error when user provides invalid email", async () => {
    const res = await request(app)
      .post("/auth/register/")
      .send({
        username: "new",
        firstName: "first",
        lastName: "last",
        password: "pw",
        email: "newemail.com",
        birthdate: new Date("9/9/1999"),
      });
    expect(res.statusCode).toEqual(400);
  });

  test("Throws Bad Request error when user provides existing email", async () => {
    const res = await request(app)
      .post("/auth/register/")
      .send({
        username: "new",
        firstName: "first",
        lastName: "last",
        password: "pw",
        email: "votieno@salesforce.com",
        birthdate: new Date("9/9/1999"),
      });
    expect(res.statusCode).toEqual(400);
  });

  test("Throws Bad Request error when user provides existing username", async () => {
    const res = await request(app)
      .post("/auth/register/")
      .send({
        username: "etsehay",
        firstName: "first",
        lastName: "last",
        password: "pw",
        email: "votno@salesforce.com",
        birthdate: new Date("9/9/1999"),
      });
    expect(res.statusCode).toEqual(400);
  });
});

describe("GET auth/me", () => {
  test("Authed user can access own profile", async () => {
    const res = await request(app)
      .get(`/auth/me`)
      .set("authorization", `Bearer ${testTokens.vernonToken}`);

    expect(res.statusCode).toEqual(200);

    const { user } = res.body;
    expect(user.firstName).toEqual("Vernon");
    expect(user.lastName).toEqual("Otieno");
  });

  test("Throws unauthorized error when anonymous user tries to access user account", async () => {
    const res = await request(app).get(`/auth/me`);

    expect(res.statusCode).toEqual(401);
  });
});

describe("GET auth/:userId", () => {
  test("Authed user can fetch a user's profile details by user id", async () => {
    const userId = testUserIds[1];
    const res = await request(app)
      .get(`/auth/${userId}`)
      .set("authorization", `Bearer ${testTokens.ammarToken}`);

    expect(res.statusCode).toEqual(200);

    const { user } = res.body;
    expect(user.firstname).toEqual("Vernon");
    expect(user.lastname).toEqual("Otieno");
  });

  test("Anonymous user can fetch a user's profile details by user id", async () => {
    const userId = testUserIds[1];
    const res = await request(app).get(`/auth/${userId}`);

    expect(res.statusCode).toEqual(200);

    const { user } = res.body;
    expect(user.firstname).toEqual("Vernon");
    expect(user.lastname).toEqual("Otieno");
  });
});

describe("PUT auth/:userId", () => {
  test("Authed user can update their own profile", async () => {
    const userId = testUserIds[2];

    const res = await request(app)
      .put(`/auth/${userId}`)
      .set("authorization", `Bearer ${testTokens.edilToken}`)
      .send({ firstName: "NotEdil", lastName: "NotTsehay" });

    expect(res.statusCode).toEqual(200);

    const { user } = res.body;

    expect(user).toEqual({
      id: expect.any(Number),
      firstname: "NotEdil",
      lastname: "NotTsehay",
      email: "etsehay@salesforce.com",
      username: "etsehay",
      location: null,
      birthdate: expect.any(String),
      image_url:
        "https://i.natgeofe.com/n/0652a07e-42ed-4f3d-b2ea-0538de0c5ba3/seattle-travel_3x2.jpg",
      gender: "female",
      createdat: expect.any(String),
      updatedat: expect.any(String),
      rating: expect.any(Number),
    });
  });

  test("Throws forbidden error when authed user tries to update other user's profile", async () => {
    const userId = testUserIds[2];

    const res = await request(app)
      .put(`/auth/${userId}`)
      .set("authorization", `Bearer ${testTokens.vernonToken}`)
      .send({ firstName: "NotEdil", lastName: "NotTsehay" });

    expect(res.statusCode).toEqual(403);
  });

  test("Throws unauthorized error when anonymous user tries to update a profile", async () => {
    const userId = testUserIds[2];

    const res = await request(app)
      .put(`/auth/${userId}`)
      .send({ firstName: "NotEdil", lastName: "NotTsehay" });

    expect(res.statusCode).toEqual(401);
  });
});

describe("DELETE auth/:userId", () => {
  test("Authed user can delete their own account", async () => {
    const userId = testUserIds[2];

    const res = await request(app)
      .delete(`/auth/${userId}`)
      .set("authorization", `Bearer ${testTokens.edilToken}`);

    expect(res.statusCode).toEqual(200);
  });

  test("Throws forbidden error when authed user tries to delete other user's account", async () => {
    const userId = testUserIds[2];

    const res = await request(app)
      .delete(`/auth/${userId}`)
      .set("authorization", `Bearer ${testTokens.ammarToken}`);

    expect(res.statusCode).toEqual(403);
  });

  test("Throws unauthorized error when anonymous user tries to delete an account", async () => {
    const userId = testUserIds[2];

    const res = await request(app).delete(`/auth/${userId}`);

    expect(res.statusCode).toEqual(401);
  });
});
