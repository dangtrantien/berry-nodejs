const express = require("express");
const WorkSpaceRouter = express.Router();
const auth = require('../middleware/AuthToken')
const WorkSpaceController = require("../controller/WorkSpaceController.js");

const workSpaceController = new WorkSpaceController();

WorkSpaceRouter
  .post("/createWorkSpace", auth, workSpaceController.createWorkSpace)
  .get("/getByID", workSpaceController.getByID)
  .get("/getByName", workSpaceController.getByName)
  .put("/updateWorkSpaceByID", workSpaceController.updateWorkSpaceByID)
  .delete("/deleteByID", workSpaceController.deleteByID)
  .get(
    "/getAllWorkSpacesOfAllUsers",
    workSpaceController.getAllWorkSpacesOfAllUsers
  );

module.exports = WorkSpaceRouter;
