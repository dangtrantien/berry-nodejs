const { taskUpdateValidate } = require("../middleware/Validate.js");
const TaskModel = require("../DAL/model/TaskModel");
const upload = require("../middleware/Upload");
const fs = require("fs");
const path = require("path");

const taskModel = new TaskModel();

class TaskController {
  createTask = async (req, res) => {
    const newTask = req.body.task;

    taskModel
      .createNew(newTask)
      .then((data) => res.send({ success: true, data: data }))
      .catch((err) => {
        res.send({
          success: false,
          message: err,
        });
      });
  };

  getAllTasksOfAllBoards = async (req, res) => {
    const data = await taskModel.boardAggregate();
    res.json({ length: data.length, data: data });
  };

  getByID = (req, res) => {
    const id = req.query.id;

    taskModel
      .findById(id)
      .then((data) => {
        if (data.length > 0) res.json(data);
        else res.json("Task dose not exist");
      })
      .catch((err) => {
        throw err;
      });
  };

  updateTaskByID = async (req, res) => {
    const { value, error } = taskUpdateValidate(req.body.task);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.query.id;

    //Tải img cho task
    if (value.image) {
      let uploadImage = await upload(value.image);

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

      value.image = {
        name: img.name,
        data: img.url,
      };
    }

    //Tải nhạc cho task
    if (value.audio) {
      let uploadAudio = await upload(value.audio);

      let audio = {
        name: uploadAudio.name,
        url: `https://x-career-06-team1-be.as.r.appspot.com/static/audios/${uploadAudio.name}`,
        // url: `http://localhost:3002/static/audios/${uploadAudio.name}`,
        data: fs.writeFile(
          path.join(`./myApp/public/audios/${uploadAudio.name}`),
          uploadAudio.data,
          function (err) {
            if (err) throw err;
          }
        ),
      };

      value.audio = {
        name: audio.name,
        data: audio.url,
      };
    }

    //Tải file cho task
    if (value.document) {
      let uploadDoc = await upload(value.document);

      let doc = {
        name: uploadDoc.name,
        url: `https://x-career-06-team1-be.as.r.appspot.com/static/documents/${uploadDoc.name}`,
        // url: `http://localhost:3002/static/documents/${uploadDoc.name}`,
        data: fs.writeFile(
          path.join(`./myApp/public/documents/${uploadDoc.name}`),
          uploadDoc.data,
          function (err) {
            if (err) throw err;
          }
        ),
      };

      value.document = {
        name: doc.name,
        data: doc.url,
      };
    }

    const result = await taskModel.update(id, value);

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
    const result = await taskModel.delete(id);

    if (result) res.json({ success: true, message: "Succesfully delete" });
    else res.json({ success: false, message: "Sorry, something went wrong" });
  };
}

module.exports = TaskController;
