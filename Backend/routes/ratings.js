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


router.post("/:listingId", security.requireAuthenticatedUser, async (req, res, next) => {
    try{
      const { user } = res.locals;
      const {listingId} =  req.params

      const ratings = req.body
      const rating = await Rating.postRating({listingId, ratings, user });
      return res.status(200).json({ rating: rating });

    } catch(error){
        next(error)
    }
})



module.exports = router;