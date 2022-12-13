const express = require("express");
const TaskRouter = express.Router();
const TaskController = require("../controller/TaskController.js");

const taskController = new TaskController();

TaskRouter
  .post("/createTask", taskController.createTask)
  .get("/getByID", taskController.getByID)
  .put("/updateTaskByID", taskController.updateTaskByID)
  .delete("/deleteByID", taskController.deleteByID)
  .get("/getAllTasksOfAllBoards", taskController.getAllTasksOfAllBoards);

module.exports = TaskRouter;
