const router = require("express").Router();
const topupController = require("../controller/topup");

router
    .get("/", topupController.getAllTopup)

module.exports = router;
