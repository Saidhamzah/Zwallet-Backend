const router = require("express").Router();
const transferController = require("../controller/transfer");

router
    .get("/", transferController.getAllTransfer)
    .get("/:id", transferController.getAllTransferById)
    .post("/:id", transferController.getAllTransferById)
    .patch("/:id", transferController.getAllTransferById)
    .delete("/:id", transferController.getAllTransferById)
module.exports = router;
