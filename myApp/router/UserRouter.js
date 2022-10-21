const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controller/UserController.js");

const userController = new UserController();

UserRouter.get("/", userController.getAllUsers);
UserRouter.get("/getUserById", userController.getUserById);
UserRouter.post("/createUser", userController.createUser);
UserRouter.get(
  "/getAllWorkSpacesOfAllUsers",
  userController.getAllWorkSpacesOfAllUsers
);
// UserRouter.get("/getAllWorkSpaceOfUser", userController.getAllWorkSpaceOfUser);
UserRouter.put("/updateUserById", userController.updateUserById);
UserRouter.delete("/deleteUserById", userController.deleteUserById);
UserRouter.post("/login", userController.login);

module.exports = UserRouter;
