const router = require("express").Router();
const topupController = require("../controller/topup");
const {authentic} = require('../Middleware/auth')
router
    .get("/",authentic, topupController.getAllTopup)
    .get("/:id",authentic, topupController.getTopupId)
    .post("/",authentic, topupController.postTopup)
    .patch("/:id",authentic, topupController.patchTopup)
    .delete("/:id",authentic, topupController.deleteTopup)

module.exports = router;
