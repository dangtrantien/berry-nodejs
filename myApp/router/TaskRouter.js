const express = require("express");
const TaskRouter = express.Router();
const TaskController = require("../controller/TaskController.js");

const taskController = new TaskController();

TaskRouter
  .get("/", taskController.getAllTasks)
  .get("/getTaskById", taskController.getTaskById)
  .post("/createTask", taskController.createTask)
  .put("/updateTaskById", taskController.updateTaskById)
  .delete("/deleteTaskById", taskController.deleteTaskById)
  .get(
    "/getAllCommentsOfAllTasks",
    taskController.getAllCommentsOfAllTasks
  );

module.exports = TaskRouter;
