const router = require("express").Router();
const topupController = require("../controller/topup");

router
    .get("/", topupController.getAllTopup)
    .get("/:id", topupController.getTopupId)
    .post("/", topupController.postTopup)
    .patch("/:id", topupController.patchTopup)
    .delete("/:id", topupController.deleteTopup)

module.exports = router;
