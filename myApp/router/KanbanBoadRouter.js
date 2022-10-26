const express = require("express");
const KanbanBoardRouter = express.Router();
const KanbanBoardController = require("../controller/KanbanBoardController.js");

const kanbanBoardController = new KanbanBoardController();

KanbanBoardRouter
  .get("/", kanbanBoardController.getAllKanbanBoards)
  .get("/getKanbanBoardById", kanbanBoardController.getKanbanBoardById)
  .post("/createKanbanBoard", kanbanBoardController.createKanbanBoard)
  .put("/updateKanbanBoardById", kanbanBoardController.updateKanbanBoardById)
  .delete("/deleteKanbanBoardById", kanbanBoardController.deleteKanbanBoardById)
  .get(
    "/getAllTicketsOfAllKanbanBoards",
    kanbanBoardController.getAllTicketsOfAllKanbanBoards
  );

module.exports = KanbanBoardRouter;
