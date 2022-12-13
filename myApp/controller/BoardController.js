const { boardUpdateValidate } = require("../middleware/Validate.js");
const BoardModel = require("../DAL/model/BoardModel");
const UserModel = require("../DAL/model/UserModel");
const upload = require("../middleware/Upload");
const fs = require("fs");
const path = require("path");

const boardModel = new BoardModel();
const userModel = new UserModel();

class boardController {
  createBoard = async (req, res) => {
    const newBoard = req.body.board;
    newBoard.userID = req.user;

    const user = await userModel.findById(newBoard.userID);
    newBoard.member = user;

    //Tải img cho background
    if (newBoard.bgImg === undefined || newBoard.bgImg === null) {
      newBoard.bgImg = {
        name: "default-board-background-img.jpg",
        data: "https://x-career-06-team1-be.as.r.appspot.com/static/default-board-background-img.jpg",
        // data: "http://localhost:3002/static/default-board-background-img.jpg",
      };
    }

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

  getByID = async (req, res) => {
    const id = req.query.id;

    const data = await boardModel.taskAggregate(id);
    if (data.length > 0) res.json(data);
    else res.json("Board dose not exist");
  };

  updateBoardByID = async (req, res) => {
    const { value, error } = boardUpdateValidate(req.body.board);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.query.id;

    if (value.bgImg) {
      let uploadImage = await upload(value.bgImg);

      let img = {
        name: uploadImage.name,
        url: `https://x-career-06-team1-be.as.r.appspot.com/static/images/${uploadImage.name}`,
        // url: `http://localhost:3002/static/images/${uploadImage.name}`,
        data: fs.writeFile(
          path.join(`./myApp/public/images/${uploadImage.name}`),
          uploadImage.data,
          function (err) {
            if (err) throw err;
          }
        ),
      };

      value.bgImg = {
        name: img.name,
        data: img.url,
      };
    }

    const result = await boardModel.update(id, value);

    if (result)
      res.send({ success: true, message: "Succesfully updated", data: result });
    else
      res.send({
        success: false,
        message: "Sorry, something went wrong",
      });
  };

  deleteByID = async (req, res) => {
    const id = req.query.id;
    const result = await boardModel.delete(id);

    if (result) res.json("Succesfully delete");
    else res.json("Sorry, something went wrong");
  };
}

module.exports = boardController;
