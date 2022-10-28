const express = require("express");
const TaskRouter = express.Router();
const TaskController = require("../controller/TaskController.js");

const taskController = new TaskController();

TaskRouter
  .get("/getTaskById", taskController.getTaskById)
  .post("/createTask", taskController.createTask)
  .put("/updateTaskById", taskController.updateTaskById)
  .delete("/deleteTaskById", taskController.deleteTaskById)
  .get("/getAllTasksOfAllTickets", taskController.getAllTasksOfAllTickets);

module.exports = TaskRouter;
