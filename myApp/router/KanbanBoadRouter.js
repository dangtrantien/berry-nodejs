const express = require("express");
const KanbanBoardRouter = express.Router();
const KanbanBoardController = require("../controller/KanbanBoardController.js");

const kanbanBoardController = new KanbanBoardController();

KanbanBoardRouter.get("/", kanbanBoardController.getAllKanbanBoards);
KanbanBoardRouter.get(
  "/getKanbanBoardById",
  kanbanBoardController.getKanbanBoardById
);
KanbanBoardRouter.post(
  "/createKanbanBoard",
  kanbanBoardController.createKanbanBoard
);

KanbanBoardRouter.put(
  "/updateKanbanBoardById",
  kanbanBoardController.updateKanbanBoardById
);
KanbanBoardRouter.delete(
  "/deleteKanbanBoardById",
  kanbanBoardController.deleteKanbanBoardById
);
KanbanBoardRouter.get(
  "/getAllTicketsOfAllKanbanBoards",
  kanbanBoardController.getAllTicketsOfAllKanbanBoards
);

module.exports = KanbanBoardRouter;
