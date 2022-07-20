const {BadRequestError, ForbiddenError} = require("../utils/errors")
const User = require("../models/user")

const authedUserOwnsProfile = async (req,res,next) => {
    try {
        const {user} = res.locals
        const {userId}  = req.params
       

        if(user.id != userId){
            throw new ForbiddenError("User is only allowed to update own profile")
        }

        return next()
    } catch(error){
        return next(error)
    }
}


module.exports = {
    authedUserOwnsProfile,

}