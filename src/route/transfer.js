const router = require("express").Router();
const transferController = require("../controller/transfer");
const {authentic} = require('../Middleware/auth')
router
    .get("/",authentic, transferController.getAllTransfer)
    .get("/:id",authentic, transferController.getAllTransferById)
    .post("/:id",authentic, transferController.postTransfer)
    .patch("/:id",authentic, transferController.patchTransfer)
    .delete("/:id",authentic, transferController.deleteTransfer)
module.exports = router;
