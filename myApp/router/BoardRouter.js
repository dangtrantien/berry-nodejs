const express = require("express");
const BoardRouter = express.Router();
const BoardController = require("../controller/BoardController.js");

const boardController = new BoardController();

BoardRouter
  .post("/createBoard", boardController.createBoard)
  .put("/updateBoardById", boardController.updateBoardById)
  .delete("/deleteBoardById", boardController.deleteBoardById)
  .get(
    "/getAllBoardsOfAllWorkSpaces",
    boardController.getAllBoardsOfAllWorkSpaces
  )
  .get(
    "/getAllTasksOfOneBoard",
    boardController.getAllTasksOfOneBoard
  );

module.exports = BoardRouter;
