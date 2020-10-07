const router = require("express").Router();
const userController = require("../controller/user");

router
    .get("/:id", userController.getAllUserById)
    .get("/:id-", userController.getSearch)
    .get("/all", userController.getAllUser)
    .post("", userController.postUserData)
    .patch("/:id", userController.patchUserById)
    .delete("/:id", userController.deleteUserById)
module.exports = router;
