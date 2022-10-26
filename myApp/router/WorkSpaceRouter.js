const express = require("express");
const WorkSpaceRouter = express.Router();
const WorkSpaceController = require("../controller/WorkSpaceController.js");

const workSpaceController = new WorkSpaceController();

WorkSpaceRouter
  .get("/", workSpaceController.getAllWorkSpaces)
  .get("/getWorkSpaceById", workSpaceController.getWorkSpaceById)
  .get("/getWorkSpaceByName", workSpaceController.getWorkSpaceByName)
  .post("/createWorkSpace", workSpaceController.createWorkSpace)
  .put("/updateWorkSpaceById", workSpaceController.updateWorkSpaceById)
  .delete("/deleteWorkSpaceById", workSpaceController.deleteWorkSpaceById)
  .get(
    "/getAllKanbanBoardOfAllWorkSpaces",
    workSpaceController.getAllKanbanBoardOfAllWorkSpaces
  );

module.exports = WorkSpaceRouter;
