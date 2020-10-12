const router = require("express").Router();
const transferController = require("../controller/transfer");

router
    .get("/:id", transferController.getAllTransferById)
module.exports = router;
