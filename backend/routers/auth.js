const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CustomAPIError = require("../errors");
const router = express.Router();

router.post("/login", async (req, res, next) => {
    res.json(111);
});

module.exports = router;
