const request = require("supertest");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTokens,
  testListingIds,
  testUserIds,
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const vernonListing = {
  user_id: expect.any(Number),
  price: 40.99,
  location: "San Diego, California",
  max_accomodation: 1,
  image_url:
    "https://static.tcimg.net/vehicles/primary/122f4b2eb5fe71e0/2022-GMC-Savana_Cargo_Van-silver-full_color-driver_side_front_quarter.png",
  model: "GMC Savana",
  description: "Clean 3 year old van",
  fees: 4,
};

/************************************** POST /listings/ */
describe("POST listing", () => {
  test("Authed user can create new listing", async () => {
    const listings = {
      location: "Canada",
      model: "Tesla",
      max_accomodation: 3,
      price: 200,
      image_url:
        "https://images.unsplash.com/photo-1539437829697-1b4ed5aebd19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
    };

    const res = await request(app)
      .post(`/listing`)
      .set("authorization", `Bearer ${testTokens.ammarToken}`)
      .send({
        location: "Canada",
        model: "Tesla",
        max_accomodation: 3,
        price: 200,
        image_url:
          "https://images.unsplash.com/photo-1539437829697-1b4ed5aebd19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
      });
    expect(res.statusCode).toEqual(200);

    var { listing } = res.body;

    listing = listing[0];

    expect(listing).toEqual({
      model: "Tesla",
      user_id: expect.any(Number),
      max_accomodation: 3,
      location: "Canada",
      image_url:
        "https://images.unsplash.com/photo-1539437829697-1b4ed5aebd19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
      price: 200,
    });
  });

  test("Throws Unauthorized error when user is unauthenticated", async () => {
    const res = await request(app).post(`/listing`);
    expect(res.statusCode).toEqual(401);
  });
});

/************************************** GET /listings/ */

describe("GET /listing", () => {
  test("Authed user can fetch all listings", async () => {
    const res = await request(app)
      .get(`/listing/`)
      .set("authorization", `Bearer ${testTokens.edilToken}`);
    expect(res.statusCode).toEqual(200);

    const { listings } = res.body;

    expect(listings.length).toEqual(13);

    const listingVernon = listings.find((l) => l.model === "GMC Savana");
    const {
      user_id,
      price,
      location,
      image_url,
      max_accomodation,
      model,
      fees,
      description,
    } = listingVernon;
    expect({
      user_id,
      price,
      location,
      image_url,
      max_accomodation,
      model,
      fees,
      description,
    }).toEqual(vernonListing);
  });

  test("Anonymous user can fetch all listings", async () => {
    const res = await request(app).get(`/listing/`);
    expect(res.statusCode).toEqual(200);

    const { listings } = res.body;

    expect(listings.length).toEqual(13);

    const listingVernon = listings.find((l) => l.model === "GMC Savana");
    const {
      user_id,
      price,
      location,
      image_url,
      max_accomodation,
      model,
      fees,
      description,
    } = listingVernon;
    expect({
      user_id,
      price,
      location,
      image_url,
      max_accomodation,
      model,
      fees,
      description,
    }).toEqual(vernonListing);
  });
});

/************************************** GET /listing/best */

describe("GET /listing/best", () => {
  test("Authed user can fetch all the best listings", async () => {
    const res = await request(app)
      .get(`/listing/best`)
      .set("authorization", `Bearer ${testTokens.vernonToken}`);
    expect(res.statusCode).toEqual(200);
    var { listings } = res.body;

    expect(listings.length).toEqual(4);
  });

  test("Anonymous user can fetch all the best listings", async () => {
    const res = await request(app).get(`/listing/best`);
    expect(res.statusCode).toEqual(200);
    var { listings } = res.body;

    expect(listings.length).toEqual(4);
  });
});

/************************************** GET /listing/user/:userId */

describe("GET listing/user/:userId", () => {
  test("Authed user can fetch all listings by a particular user", async () => {
    const userId = testUserIds[1];
    const res = await request(app)
      .get(`/listing/user/${userId}`)
      .set("authorization", `Bearer ${testTokens.ammarToken}`);
    expect(res.statusCode).toEqual(200);

    var { listings } = res.body;

    const listingVernon = listings.find((l) => l.model === "GMC Savana");
    const {
      user_id,
      price,
      location,
      image_url,
      max_accomodation,
      model,
      fees,
      description,
    } = listingVernon;
    expect({
      user_id,
      price,
      location,
      image_url,
      max_accomodation,
      model,
      fees,
      description,
    }).toEqual(vernonListing);
  });

  test("Anonymous user can fetch all listings by a particular user", async () => {
    const userId = testUserIds[1];
    const res = await request(app).get(`/listing/user/${userId}`);

    expect(res.statusCode).toEqual(200);

    var { listings } = res.body;

    const listingVernon = listings.find((l) => l.model === "GMC Savana");
    const {
      user_id,
      price,
      location,
      image_url,
      max_accomodation,
      model,
      fees,
      description,
    } = listingVernon;
    expect({
      user_id,
      price,
      location,
      image_url,
      max_accomodation,
      model,
      fees,
      description,
    }).toEqual(vernonListing);
  });
});

/************************************** GET /listing/:listingId */

describe("GET /listing/:listingId", () => {
  test("Authed user can fetch a listing by its id", async () => {
    const listingId = testListingIds[1];
    const res = await request(app)
      .get(`/listing/${listingId}/`)
      .set("authorization", `Bearer ${testTokens.vernonToken}`);
    expect(res.statusCode).toEqual(200);
    // console.log("This is res", res.text)

    var { listing } = res.body;
    listing = listing[0];

    const {
      user_id,
      price,
      location,
      image_url,
      max_accomodation,
      model,
      fees,
      description,
    } = listing;
    expect({
      user_id,
      price,
      location,
      image_url,
      max_accomodation,
      model,
      fees,
      description,
    }).toEqual(vernonListing);
  });

  test("Anonymous user can fetch a listing by its id", async () => {
    const listingId = testListingIds[1];
    const res = await request(app).get(`/listing/${listingId}/`);
    expect(res.statusCode).toEqual(200);
    // console.log("This is res", res.text)

    var { listing } = res.body;
    listing = listing[0];

    const {
      user_id,
      price,
      location,
      image_url,
      max_accomodation,
      model,
      fees,
      description,
    } = listing;
    expect({
      user_id,
      price,
      location,
      image_url,
      max_accomodation,
      model,
      fees,
      description,
    }).toEqual(vernonListing);
  });
});

/************************************** PUT /listing/:listingId */
describe("PUT /listing/:listingId", () => {
  test("Authed user can update their own listing", async () => {
    const listingId = testListingIds[1];

    const listingUpdate = { model: "Toyota Corolla" };
    const res = await request(app)
      .put(`/listing/${listingId}`)
      .set("authorization", `Bearer ${testTokens.vernonToken}`)
      .send(listingUpdate);
    expect(res.statusCode).toEqual(200);

    var { listing } = res.body;

    expect(listing.model).toEqual("Toyota Corolla");
  });

  test("Throws forbidden error when authed user tries to update other user's listing", async () => {
    const listingId = testListingIds[1];

    const listingUpdate = { model: "Toyota Corolla" };
    const res = await request(app)
      .put(`/listing/${listingId}`)
      .set("authorization", `Bearer ${testTokens.ammarToken}`)
      .send(listingUpdate);
    expect(res.statusCode).toEqual(403);
  });

  test("Throws unauthorized error when anonymous user tries to update a listing", async () => {
    const listingId = testListingIds[1];

    const listingUpdate = { model: "Toyota Corolla" };
    const res = await request(app)
      .put(`/listing/${listingId}`)
      .send(listingUpdate);
    expect(res.statusCode).toEqual(401);
  });
});

/************************************** DELETE /listing/:listingId */

describe("DELETE /listing/:listingId", () => {
  test("Authed user can delete their own listing", async () => {
    const listingId = testListingIds[1];

    const res = await request(app)
      .delete(`/listing/${listingId}`)
      .set("authorization", `Bearer ${testTokens.vernonToken}`);
    expect(res.statusCode).toEqual(200);
  });

  test("Throws forbidden error when authed user tries to delete other user's listing", async () => {
    const listingId = testListingIds[1];

    const res = await request(app)
      .delete(`/listing/${listingId}`)
      .set("authorization", `Bearer ${testTokens.edilToken}`);
    expect(res.statusCode).toEqual(403);
  });

  test("Throws unauthorized error when anonymous user tries to delete a listing", async () => {
    const listingId = testListingIds[1];

    const res = await request(app).delete(`/listing/${listingId}`);
    expect(res.statusCode).toEqual(401);
  });
});

// /************************************** GET /listings/:listingId */

// describe("GET /listings/:listingId", () => {
//   test("Authenticated user can get listing by id", async () => {
//     const listingId = testListingIds[0]
//     const res = await request(app).get(`/listings/${listingId}/`).set("authorization", `Bearer ${testTokens.jloToken}`)
//     expect(res.statusCode).toEqual(200)

//     const { listing } = res.body
//     const { username, location, title, description, imageUrl, imageUrl2, imageUrl3, price } = listing
//     expect({ username, location, title, description, imageUrl, imageUrl2, imageUrl3, price: Number(price) }).toEqual(
//       lebronFrenchListing
//     )
//   })

//   test("Throws Unauthorized error when user is unauthenticated", async () => {
//     const listingId = testListingIds[0]
//     const res = await request(app).get(`/listings/${listingId}/`)
//     expect(res.statusCode).toEqual(401)
//   })
//})
