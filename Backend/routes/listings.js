const express = require("express");
const Listing = require("../models/listing");
const security = require("../middleware/security");
const permissions = require("../middleware/permissions");
const router = express.Router();
const { s3 } = require("../config");

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

router.post("/filter", async (req, res, next) => {
  try {
    // const search = {minPrice : "", maxPrice : "50", location : "", model : "Chevrolet", year : "", minRating: ""}
    // var listings = await Listing.filterListings(search)
    var listings = await Listing.filterListings(req.body);
    return res.status(200).json({ listings: listings });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/user/:userId",

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

    const images = req.files;
    const listingInfo = req.body;

    const listing = await Listing.postListing(listingInfo, user, images);

    return res.status(200).json({ listing: listing });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:listingId",
  security.requireAuthenticatedUser,
  permissions.userOwnsListing,
  async (req, res, next) => {
    try {
      const { listingId } = req.params;

      const listing = await Listing.editListing({
        listingUpdate: req.body,
        listingId,
      });

      return res.status(200).json({ listing: listing });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:listingId",
  security.requireAuthenticatedUser,
  permissions.userOwnsListing,
  async (req, res, next) => {
    try {
      const { listingId } = req.params;
      await Listing.deleteListing(listingId);
      return res.status(200).json();
    } catch (error) {}
  }
);

module.exports = router;
