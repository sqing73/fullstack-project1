const express = require("express");
const { createUser, updatePassword } = require("../controllers/user");
const router = express.Router();

router.post("/", createUser);
router.put("/", updatePassword);

module.exports = router;
