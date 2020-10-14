const router = require("express").Router();
const userController = require("../controller/user");
const {authentic} = require('../Middleware/auth')

router
    .get("/:id", authentic, userController.getAllUserById)
    // .get("/:id-", authentic, userController.getSearch)
    .get("/all", authentic, userController.getAllUser)
    .post("", authentic, userController.postUserData)
    .patch("/:id",authentic, userController.patchUserById)
    .delete("/:id",authentic, userController.deleteUserById)
module.exports = router;
