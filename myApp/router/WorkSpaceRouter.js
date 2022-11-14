const express = require("express");
const WorkSpaceRouter = express.Router();
const auth = require('../middleware/AuthToken')
const WorkSpaceController = require("../controller/WorkSpaceController.js");

const workSpaceController = new WorkSpaceController();

WorkSpaceRouter
  // .post("/createWorkSpace", auth, workSpaceController.createWorkSpace)
  .post("/createWorkSpace", workSpaceController.createWorkSpace)
  .put("/updateWorkSpaceById", workSpaceController.updateWorkSpaceById)
  .delete("/deleteWorkSpaceById", workSpaceController.deleteWorkSpaceById)
  .get("/getWorkSpaceByID", workSpaceController.getWorkSpaceByID)
  .get("/getWorkSpaceByName", workSpaceController.getWorkSpaceByName)
  .get(
    "/getAllWorkSpacesOfAllUsers",
    workSpaceController.getAllWorkSpacesOfAllUsers
  );

module.exports = WorkSpaceRouter;
