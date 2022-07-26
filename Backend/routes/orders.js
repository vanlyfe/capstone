const express = require("express");
const Order = require("../models/order")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")
const router = express.Router();

router.get("/", async (req, res, next) => {
    try{

    } catch(error){
        next(error)
    }
})

router.get("/user/:userId", security.requireAuthenticatedUser, async (req, res, next) => {
    try{

    } catch(error){
        next(error)
    }
})

router.get("/:orderId", security.requireAuthenticatedUser , async (req, res, next) => {
    try{

    } catch(error){
        next(error)
    }
})



module.exports = router;