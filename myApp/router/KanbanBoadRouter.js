const express = require("express");
const KanbanBoardRouter = express.Router();
const KanbanBoardController = require("../controller/KanbanBoardController.js");

const kanbanBoardController = new KanbanBoardController();

KanbanBoardRouter.get("/", kanbanBoardController.getAllKanbanBoards);
KanbanBoardRouter.get("/:id", kanbanBoardController.getKanbanBoardById);
KanbanBoardRouter.post("/createKanbanBoard", kanbanBoardController.createKanbanBoard);

KanbanBoardRouter.put("/:id", kanbanBoardController.updateKanbanBoardById);
KanbanBoardRouter.delete("/:id", kanbanBoardController.deleteKanbanBoardById);

module.exports = KanbanBoardRouter;
