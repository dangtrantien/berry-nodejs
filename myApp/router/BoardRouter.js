const express = require("express");
const BoardRouter = express.Router();
const auth = require("../middleware/AuthToken");
const BoardController = require("../controller/BoardController.js");

const boardController = new BoardController();

BoardRouter
  .post("/createBoard", auth, boardController.createBoard)
  .put("/updateBoardById", boardController.updateBoardById)
  .delete("/deleteBoardById", boardController.deleteBoardById)
  .get("/getBoardByID", boardController.getBoardByID)
  .get(
    "/getAllBoardsOfAllWorkSpaces",
    boardController.getAllBoardsOfAllWorkSpaces
  );

module.exports = BoardRouter;
