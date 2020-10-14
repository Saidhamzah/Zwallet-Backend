const express = require("express");
const router = express.Router();

const authController = require("../controller/auth");
const { route } = require("./user");

router.post('/register', authController.register)
router.get('/login', authController.login)

module.exports = router;
