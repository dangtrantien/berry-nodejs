const { kanbanBoardUpdateValidate } = require("../middleware/Validate.js");
const KanbanBoardModel = require("../DAL/model/KanbanBoardModel");

const kanbanBoardModel = new KanbanBoardModel();

class KanbanBoardController {
  createKanbanBoard = async (req, res) => {
    const newKanbanBoard = req.body.newKanbanBoard;

    kanbanBoardModel
      .createNew(newKanbanBoard)
      .then((data) => res.send(data))
      .catch((err) => {
        throw err;
      });
  };

  getAllKanbanBoards = (req, res) => {
    kanbanBoardModel
      .getAll(req.query.skip, req.query.limit, req.query.orderBy)
      .then((data) => {
        res.json({
          length: data.length,
          data: data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  getKanbanBoardById = (req, res) => {
    const id = req.query.id;

    kanbanBoardModel
      .findById(id)
      .then((data) => res.json(data))
      .catch((err) => {
        throw err;
      });
  };

  updateKanbanBoardById = async (req, res) => {
    const { value, error } = kanbanBoardUpdateValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.query.id;
    const result = await kanbanBoardModel.update(id, value);

    if (result) res.send({ success: true, message: "Succesfully updated" });
    else
      res.send({
        success: false,
        message: "Sorry, something went wrong",
      });
  };

  deleteKanbanBoardById = async (req, res) => {
    const id = req.query.id;
    const result = await kanbanBoardModel.delete(id);

    if (result) res.json("Succesfully delete");
    else res.json("Sorry, Something went wrong");
  };

  getAllTicketsOfAllKanbanBoards = async (req, res) => {
    const data = await kanbanBoardModel.ticketAggregate();
    res.json({ length: data.length, data: data });
  };
}

module.exports = KanbanBoardController;
