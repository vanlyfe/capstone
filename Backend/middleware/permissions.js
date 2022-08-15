const { BadRequestError, ForbiddenError } = require("../utils/errors");
const db = require("../db");

const userOwnsProfile = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { userId } = req.params;

    if (user.id != userId) {
      if (req.baseUrl === "/auth") {
        throw new ForbiddenError("User can only edit their own account");
      } else if (req.baseUrl === "/order") {
        throw new ForbiddenError(
          "User can only view orders belonging to their account"
        );
      }
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const userOwnsOrder = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { orderId } = req.params;

    var order = await db.query(
      `
      SELECT user_id
      FROM orders
      WHERE id = $1
      
      `,
      [orderId]
    );

    order = order.rows[0];

    if (order.user_id !== user.id) {
      throw new ForbiddenError(
        "User can on view orders belonging to their account"
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

    listing = listing.rows[0];

    if (!listing) {
      throw new BadRequestError("Listing does not exist");
    }

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

const userOwnsReview = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { reviewId } = req.params;
    var review = await db.query(
      `
                  SELECT user_id
                  FROM reviews
                  WHERE id = $1
          `,
      [reviewId]
    );

    review = review.rows[0];

    const userId = review.user_id;

    if (user.id != userId) {
      throw new ForbiddenError("User can only edit their own reviews");
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const userIsNotListingOwner = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    var listing = await db.query(
      `
        SELECT user_id
        FROM listings
        WHERE id = $1
      
      `,
      [listingId]
    );

    listing = listing.rows[0];

    const { user } = res.locals;

    if (listing.user_id == user.id) {
      if (req.baseUrl === "/review") {
        throw new ForbiddenError(
          "User is not allowed to review their own listing"
        );
      } else if (req.baseUrl === "/rating") {
        throw new ForbiddenError(
          "User is not allowed to rate their own listing"
        );
      } else {
        throw new ForbiddenError(
          "User is not allowed to book their own listing"
        );
      }
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  userOwnsProfile,
  userOwnsListing,
  userOwnsReview,
  userOwnsOrder,
  userIsNotListingOwner,
};
