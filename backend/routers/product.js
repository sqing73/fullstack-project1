const express = require("express");
const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors");
const userController = require("../controllers/user");
const productController = require("../controllers/product");
const router = express.Router();


module.exports = router;
