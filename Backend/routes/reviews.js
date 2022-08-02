const express = require("express");
const Review = require("../models/review");
const security = require("../middleware/security");
const permissions = require("../middleware/permissions");
const router = express.Router();

router.get("/:listingId", async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const reviews = await Review.getReviewsByListingId(listingId);

    return res.status(200).json({ reviews: reviews });
  } catch (error) {
    next(error);
  }
});

router.get("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.getReviewsByUserId(userId);

    return res.status(200).json({ reviews: reviews });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:listingId",
  security.requireAuthenticatedUser,
  permissions.userIsNotListingOwner,
  async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { listingId } = req.params;
      const reviews = req.body;
      const review = await Review.postReview({ listingId, reviews, user });
      return res.status(200).json({ review: review });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:reviewId",
  security.requireAuthenticatedUser,
  permissions.userOwnsReview,
  async (req, res, next) => {
    try {
      const { reviewId } = req.params;

      const review = await Review.editReview({
        reviewUpdate: req.body,
        reviewId,
      });

      return res.status(200).json({ review: review });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:reviewId",
  security.requireAuthenticatedUser,
  permissions.userOwnsReview,
  async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      await Review.deleteReview(reviewId);
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
