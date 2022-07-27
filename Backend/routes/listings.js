const express = require("express");
const Listing = require("../models/listing")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")
const router = express.Router();

router.get("/", async (req, res, next) => {
    try{

        var listings = await Listing.getListings();

        return res.status(200).json({listings : listings})

    } catch(error){
        next(error)
    }
})




router.get("/user/:userId", security.requireAuthenticatedUser, async (req, res, next) => {
    try{
        var userId = req.params.userId
        var listings = await Listing.getUserListings(userId)
       
        return res.status(200).json({listings: listings})

    } catch(error){
        next(error)
    }
})



router.get("/:listingId", security.requireAuthenticatedUser,  async (req, res, next) => {
    try{

        
        var id = req.params.listingId

        var listing = await Listing.getListingById(id)
        return res.status(200).json({listing: listing})

    } catch(error){
        next(error)
    }
})



module.exports = router;