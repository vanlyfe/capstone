const express = require("express");
const Rating = require("../models/rating")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")
const router = express.Router();

router.get("/:listingId", async (req, res, next) => {
    try{

    } catch(error){
        next(error)
    }
})



module.exports = router;