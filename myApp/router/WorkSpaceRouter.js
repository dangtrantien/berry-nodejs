const express = require("express");
const WorkSpaceRouter = express.Router()
const WorkSpaceController = require("../controller/WorkSpaceController.js")

const workSpaceController = new WorkSpaceController();

WorkSpaceRouter.get("/", workSpaceController.getAllWorkSpaces);
WorkSpaceRouter.get("/getWorkSpaceById", workSpaceController.getWorkSpaceById);
WorkSpaceRouter.post("/createWorkSpace", workSpaceController.createWorkSpace);
WorkSpaceRouter.put("/updateWorkSpaceById", workSpaceController.updateWorkSpaceById);
WorkSpaceRouter.delete("/deleteWorkSpaceById", workSpaceController.deleteWorkSpaceById);

module.exports = WorkSpaceRouter 