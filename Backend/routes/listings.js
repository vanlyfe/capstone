const express = require("express");
const Listing = require("../models/listing");
const security = require("../middleware/security");
const permissions = require("../middleware/permissions");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    var listings = await Listing.getListings();

    return res.status(200).json({ listings: listings });
  } catch (error) {
    next(error);
  }
});

router.get("/best", async (req, res, next) => {
  try {
    var listings = await Listing.getBestListings();
    return res.status(200).json({ listings: listings });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/user/:userId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      var userId = req.params.userId;
      var listings = await Listing.getUserListings(userId);

      return res.status(200).json({ listings: listings });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:listingId", async (req, res, next) => {
  try {
    var id = req.params.listingId;

    var listing = await Listing.getListingById(id);
    return res.status(200).json({ listing: listing });
  } catch (error) {
    next(error);
  }
});

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { user } = res.locals;
    const listings = req.body;
    const listing = await Listing.postListing({ listings, user });
    return res.status(200).json({ listing: listing });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
