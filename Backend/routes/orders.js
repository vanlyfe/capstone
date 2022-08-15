const express = require("express");
const Order = require("../models/order");
const security = require("../middleware/security");
const permissions = require("../middleware/permissions");
const router = express.Router();

router.get(
  "/user/:userId",
  security.requireAuthenticatedUser,
  permissions.userOwnsProfile,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const orders = await Order.getOrdersByUserId(userId);

      return res.status(200).json({ orders: orders });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/user/past/:userId",
  security.requireAuthenticatedUser,
  permissions.userOwnsProfile,

  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const orders = await Order.getUserPastOrders(userId);

      return res.status(200).json({ orders: orders });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/user/active/:userId",
  security.requireAuthenticatedUser,
  permissions.userOwnsProfile,

  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const orders = await Order.getUserActiveOrders(userId);

      return res.status(200).json({ orders: orders });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:orderId",
  security.requireAuthenticatedUser,
  permissions.userOwnsOrder,
  async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await Order.getOrderById(orderId);

      return res.status(200).json({ order: order });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:listingId",
  security.requireAuthenticatedUser,
  permissions.userIsNotListingOwner,
  async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { listingId } = req.params;

      const orders = req.body;
      const order = await Order.postOrder({ listingId, orders, user });
      Order.sendmail(user.id);
      Order.sendmailToHost(listingId);
      return res.status(200).json({ order: order });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
