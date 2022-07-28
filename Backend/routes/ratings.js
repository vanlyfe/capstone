const express = require("express");
const Rating = require("../models/rating")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")
const router = express.Router();

router.get("/:listingId", async (req, res, next) => {
    try{

        const {listingId} = req.params
        const rating = await Rating.getRatingByListingId(listingId)

        return res.status(200).json({rating : rating})

    } catch(error){
        next(error)
    }
})



module.exports = router;