const { BadRequestError, ForbiddenError } = require("../utils/errors");
const User = require("../models/user");
const db = require("../db")

const userOwnsProfile = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { userId } = req.params;

    if (user.id != userId) {
      throw new ForbiddenError("User can only edit their own account");
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const userOwnsAccount = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { userId } = req.params;

    if (user.id != userId) {
      throw new ForbiddenError(
        "User can only view orders belonging to their own account"
      );
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const userOwnsListing = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { listingId } = req.params;
    var listing = await db.query(
      `
                SELECT user_id
                FROM listings
                WHERE id = $1
        `,
      [listingId]
    );

    listing = listing.rows[0]

    const userId = listing.user_id;
    
    if (user.id != userId) {
      throw new ForbiddenError(
        "User can only edit listing belonging to their account"
      );
    }

    

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  userOwnsProfile,
  userOwnsAccount,
  userOwnsListing,
};
