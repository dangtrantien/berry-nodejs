const { boardUpdateValidate } = require("../middleware/Validate.js");
const BoardModel = require("../DAL/model/BoardModel");

const boardModel = new BoardModel();

class boardController {
  createBoard = async (req, res) => {
    const newBoard = req.body.board;

    boardModel
      .createNew(newBoard)
      .then((data) => res.send(data))
      .catch((err) => {
        throw err;
      });
  };

  getAllBoardsOfAllWorkSpaces = async (req, res) => {
    const data = await boardModel.workspaceAggregate();
    res.json({ length: data.length, data: data });
  };

  getBoardByID = async (req, res) => {
    const id = req.query.id;

    const data = await boardModel.taskAggregate(id);
    if (data.length > 0) res.json(data);
    else res.json("board dose not exist");
  };

  updateBoardById = async (req, res) => {
    const { value, error } = boardUpdateValidate(req.body.board);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.query.id;
    const result = await boardModel.update(id, value);

    if (result) res.send({ success: true, message: "Succesfully updated" });
    else
      res.send({
        success: false,
        message: "Sorry, something went wrong",
      });
  };

  deleteBoardById = async (req, res) => {
    const id = req.query.id;
    const result = await boardModel.delete(id);

    if (result) res.json("Succesfully delete");
    else res.json("Sorry, something went wrong");
  };
}

module.exports = boardController;
