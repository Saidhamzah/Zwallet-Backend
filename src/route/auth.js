const express = require("express");
const router = express.Router();

const authController = require("../controller/auth");

router.post('/register', authController.authentication)

module.exports = router;
