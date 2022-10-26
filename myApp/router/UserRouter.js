const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controller/UserController.js");

const userController = new UserController();

UserRouter
  .get("/", userController.getAllUsers)
  .get("/getUserById", userController.getUserById)
  .post("/createUser", userController.createUser)
  .get("/getAllWorkSpacesOfAllUsers", userController.getAllWorkSpacesOfAllUsers)
  // UserRouter.get("/getAllWorkSpaceOfUser", userController.getAllWorkSpaceOfUser);
  .put("/updateUserById", userController.updateUserById)
  .delete("/deleteUserById", userController.deleteUserById)
  .post("/login", userController.login);

module.exports = UserRouter;
