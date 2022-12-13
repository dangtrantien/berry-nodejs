const express = require("express");
const BoardRouter = express.Router();
const auth = require("../middleware/AuthToken");
const BoardController = require("../controller/BoardController.js");

const boardController = new BoardController();

BoardRouter
  .post("/createBoard", auth, boardController.createBoard)
  .get("/getByID", boardController.getByID)
  .put("/updateBoardByID", boardController.updateBoardByID)
  .delete("/deleteByID", boardController.deleteByID)
  .get(
    "/getAllBoardsOfAllWorkSpaces",
    boardController.getAllBoardsOfAllWorkSpaces
  );

module.exports = BoardRouter;
