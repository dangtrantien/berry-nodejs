const CommentModel = require("../DAL/model/CommentModel");
const TaskModel = require("../DAL/model/TaskModel");
const upload = require("../middleware/Upload");
const fs = require("fs");
const path = require("path");

const commentModel = new CommentModel();
const taskModel = new TaskModel();

class CommentController {
  addComment = async (req, res) => {
    try {
      const comment = req.body.comment;
      comment.senderID = req.user;

       //Tải img cho comment
    if (comment.image) {
      let uploadImage = await upload(comment.image);

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

      comment.image = {
        name: img.name,
        data: img.url,
      };
    }

    //Tải nhạc cho comment
    if (comment.audio) {
      let uploadAudio = await upload(comment.audio);

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

      comment.audio = {
        name: audio.name,
        data: audio.url,
      };
    }

    //Tải file cho comment
    if (comment.document) {
      let uploadDoc = await upload(comment.document);

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

      comment.document = {
        name: doc.name,
        data: doc.url,
      };
    }

      const post = await commentModel.addCommentInTask(comment);

      return res.status(200).json({ success: true, post });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  };

  getCommentByTaskID = async (req, res) => {
    try {
      const taskID = req.query.id;
      const task = await taskModel.findById(taskID);
      if (!task) {
        return res.status(400).json({
          success: false,
          message: "No task exists for this id",
        });
      }

      const comment = await commentModel.getCommentByTaskId(taskID);

      return res.status(200).json({ comment });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  updateCommentByID = async (req, res) => {
    const id = req.query.id;
    const comment = req.body.comment;

     //Tải img cho comment
     if (comment.image) {
      let uploadImage = await upload(comment.image);

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

      comment.image = {
        name: img.name,
        data: img.url,
      };
    }

    //Tải nhạc cho task
    if (comment.audio) {
      let uploadAudio = await upload(comment.audio);

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

      comment.audio = {
        name: audio.name,
        data: audio.url,
      };
    }

    //Tải file cho task
    if (comment.document) {
      let uploadDoc = await upload(comment.document);

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

      comment.document = {
        name: doc.name,
        data: doc.url,
      };
    }

    const result = await commentModel.update(id, comment);

    if (result)
      res
        .status(200)
        .json({ success: true, message: "Succesfully updated", data: result });
    else
      res
        .status(500)
        .json({ success: false, message: "Sorry, something went wrong" });
  };

  deleteByID = async (req, res) => {
    const id = req.query.id;
    const result = await commentModel.delete(id);

    if (result) res.status(200).json("Succesfully delete");
    else
      res
        .status(500)
        .json({ success: false, message: "Sorry, something went wrong" });
  };
}

module.exports = CommentController;
