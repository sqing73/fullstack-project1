const express = require("express");
const { createUser, updatePassword, getUser } = require("../controllers/user");
const { authenticationMiddleware: auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", auth, getUser);
router.post("/", createUser);
router.put("/", updatePassword);

module.exports = router;
