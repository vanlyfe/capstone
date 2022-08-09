const express = require("express");
const User = require("../models/user");

const { createUserJwt } = require("../utils/tokens");
const { createResetToken } = require("../utils/tokens");
const security = require("../middleware/security");
const permissions = require("../middleware/permissions");
const { Router } = require("express");
const router = express.Router();


router.post("/requestreset", async (req, res, next) => {
    try {
      const requestPasswordResetService = await User.requestPasswordReset(
        req.body.email
      );

      const what = User.sendmail(req.body.email, requestPasswordResetService)
   
  
      return res.json(requestPasswordResetService);
    } catch (error) {
      next(error);
    }
  });

router.put("/updatepassword", async (req, res, next) => {
  try {
   
    const {token} = req.body
    const { password } = req.body;
    const user = await User.updatePassword({password, token});

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
