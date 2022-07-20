const express = require("express");
const User = require("../models/user")

const {createUserJwt} = require("../utils/tokens")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")
const router = express.Router();


router.put("/user/:userId", security.requireAuthenticatedUser, permissions.authedUserOwnsProfile, async (req, res, next) => {
    try{
        const {userId} = req.params
        const user = await User.editUser({userUpdate : req.body, userId})
        res.locals.user = user
        return res.status(200).json({user})

    } catch (error){
        next(error)
    }

})





module.exports = router;
