const express = require("express");
const Favorite = require("../models/favorite");
const security = require("../middleware/security");
const permissions = require("../middleware/permissions");
const router = express.Router();

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const favorites = await Favorite.getUserFavorites(userId);

    return res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:listingId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { listingId } = req.params;
      const { user } = res.locals;

      const userId = user.id;

      const favorite = await Favorite.postFavorite(userId, listingId);

      return res.status(200).json(favorite);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await Favorite.deleteFavorite(id);
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
