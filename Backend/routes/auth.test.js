const request = require("supertest");
const app = require("../app");

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

/************************************** POST /auth/token */

describe("Auth Routes", () => {
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
          birthdate: expect.any(String),
          createdAt: expect.any(String)
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
})

    //   /************************************** POST /auth/register */
    describe("POST /auth/register", () => {
      test("Allows user to register with valid credentials", async () => {
        const res = await request(app).post("/auth/register/").send({
          username: "new",
          firstName: "first",
          lastName: "last",
          password: "pw",
          email: "new@email.com",
          birthdate : new Date("9/9/1999")
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
            birthdate : expect.any(String)
          },
        });
      });

      test("Throws Bad Request error when user doesn't provide all fields", async () => {
        const res = await request(app).post("/auth/register/").send({
          username: "new",
        })
        expect(res.statusCode).toEqual(400)
      })

      test("Throws Bad Request error when user provides invalid email", async () => {
        const res = await request(app).post("/auth/register/").send({
            username: "new",
            firstName: "first",
            lastName: "last",
            password: "pw",
            email: "newemail.com",
            birthdate : new Date("9/9/1999")
          });
          expect(res.statusCode).toEqual(400);
      })

      test("Throws Bad Request error when user provides existing email", async () => {
        const res = await request(app).post("/auth/register/").send({
            username: "new",
            firstName: "first",
            lastName: "last",
            password: "pw",
            email: "votieno@salesforce.com",
            birthdate : new Date("9/9/1999")
          });
          expect(res.statusCode).toEqual(400);
      })

      test("Throws Bad Request error when user provides existing username", async () => {
        const res = await request(app).post("/auth/register/").send({
            username: "etsehay",
            firstName: "first",
            lastName: "last",
            password: "pw",
            email: "votno@salesforce.com",
            birthdate : new Date("9/9/1999")
          });
          expect(res.statusCode).toEqual(400);
      })
    });

    describe("GET auth/me", () => {
        test("Authed user can access own profile", async () => {

        })

        test("Throws unauthorized error when anonymous user tries to access user account", async () => {

        })
    })


    describe("GET auth/:userId", () => {
        test("User can fetch a user's profile details by user id", async () => {

        })
    })

    describe("PUT auth/:userId", () => {
        test("Authed user can update their own profile", async () => {

        })

        test("Throws forbidden error when authed user tries to update other user's profile", async () => {

        })

        test("Throws unauthorized error when anonymous user tries to update a profile", async () => {

        })
    })


    describe("DELETE auth/:userId", () => {
        test("Authed user can delete their own account", async () => {

        })

        test("Throws forbidden error when authed user tries to delete other user's account", async () => {

        })

        test("Throws unauthorized error when anonymous user tries to delete an account", async () => {

        })

    })



  });

