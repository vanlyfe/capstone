const express = require("express");
const Listing = require("../models/listing")
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

router.get("/:listingId", security.requireAuthenticatedUser,  async (req, res, next) => {
    try{

    } catch(error){
        next(error)
    }
})



module.exports = router;