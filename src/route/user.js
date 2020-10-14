const router = require("express").Router();
const userController = require("../controller/user");
const {authentic} = require('../Middleware/auth')

router
    .get("/profile", authentic, userController.getAllUser)
    .get("/profile:id", authentic, userController.getAllUserById)
    .get("/:id", authentic, userController.getSearch)
    // .get("/:id", authentic, userController.getSearchPage)
    .get("/all", authentic, userController.getAllUser)
    // .post("", authentic, userController.postUserData)
    .patch("/:id-upload", authentic, userController.uploadImage)
    .patch("/:id",authentic, userController.patchUserById)
    .delete("/:id",authentic, userController.deleteUserById)

module.exports = router;