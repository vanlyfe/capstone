const {BadRequestError, ForbiddenError} = require("../utils/errors")
const User = require("../models/user")

const userOwnsProfile = async (req,res,next) => {
    try {
        const {user} = res.locals
        const {userId}  = req.params
       

        if(user.id != userId){
            throw new ForbiddenError("User can only edit their own profile")
        }

        return next()
    } catch(error){
        return next(error)
    }
}

const userOwnsAccount = async (req,res,next) => {
    try {
        const {user} = res.locals
        const {userId}  = req.params
       

        if(user.id != userId){
            throw new ForbiddenError("User can only view orders belonging to their own account")
        }

        return next()
    } catch(error){
        return next(error)
    }
}





module.exports = {
    userOwnsProfile,
    userOwnsAccount

}