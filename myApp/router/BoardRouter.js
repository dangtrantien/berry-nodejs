const express = require("express");
const BoardRouter = express.Router();
const BoardController = require("../controller/BoardController.js");

const boardController = new BoardController();

BoardRouter
  .post("/createBoard", boardController.createBoard)
  .put("/updateBoardById", boardController.updateBoardById)
  .delete("/deleteBoardById", boardController.deleteBoardById)
  .get("/getBoardByID", boardController.getBoardByID)
  .get(
    "/getAllBoardsOfAllWorkSpaces",
    boardController.getAllBoardsOfAllWorkSpaces
  );

module.exports = BoardRouter;
