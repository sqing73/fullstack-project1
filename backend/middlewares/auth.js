const jwt = require("jsonwebtoken");
const User = require("../models/User");
const roles = require("../constants/authorization");
const CustomAPIError = require("../errors");
const path = require("path");

const envFilePath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envFilePath });

const authenticationMiddleware = async (req, res, next) => {
  try {
    let token =
      req.header("x-auth-token") ||
      req.headers?.authorization?.match(/^Bearer (.+)/)[1];
    if (!token) {
      throw new CustomAPIError("Token not found", 400);
    }
    token = token.includes("Bearer") ? token.split(" ")[1] : token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log("black-list:", Array.from(req.app.locals.blackList));
    if (req.app.locals.blackList.has(decoded.user.id)) {
      throw new CustomAPIError("Invalid token", 401);
    }
    next();
  } catch (err) {
    err =
      err instanceof jwt.JsonWebTokenError
        ? new CustomAPIError("Invalid token", 401)
        : err;
    next(err);
  }
};

const authorizationMiddleware = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (user.role !== roles.ADMIN) {
      throw new CustomAPIError("User not authorized", 403);
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authenticationMiddleware,
  authorizationMiddleware,
};
