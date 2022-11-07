const express = require("express");
const TaskRouter = express.Router();
const TaskController = require("../controller/TaskController.js");

const taskController = new TaskController();

TaskRouter
  .post("/createTask", taskController.createTask)
  .put("/updateTaskById", taskController.updateTaskById)
  .delete("/deleteTaskById", taskController.deleteTaskById)
  .get("/getTaskById", taskController.getTaskById)
  .get("/getAllTasksOfAllBoards", taskController.getAllTasksOfAllBoards);

module.exports = TaskRouter;
