const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CustomAPIError = require("../errors");
const path = require("path");
const {
  authenticationMiddleware: auth,
  authorizationMiddleware: admin,
} = require("../middlewares/auth");
const router = express.Router();

const envFilePath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envFilePath });

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomAPIError("Email or password missing", 400);
    }
    let user = await User.findOne({ email });
    if (!user) {
      throw new CustomAPIError("Email not found", 400);
    }
    if (user.password !== password) {
      throw new CustomAPIError("Password not right", 400);
    }
    const jwtPayload = {
      user: {
        id: user._id,
      },
    };
    const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    // remove the user from black list
    // or authentication middleware might block the user
    req.app.locals.blackList.delete(user._id);
    res.json({ token: jwtToken });
  } catch (err) {
    next(err);
  }
});

router.delete("/logout", auth, async (req, res, next) => {
  req.app.locals.blackList.add(req.user.id);
  res.sendStatus(200);
});

module.exports = router;
