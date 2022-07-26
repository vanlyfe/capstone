const express = require("express");
const Review = require("../models/review")
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