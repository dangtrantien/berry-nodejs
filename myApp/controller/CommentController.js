const UserModel = require("../DAL/model/UserModel");
const TaskModel = require("../DAL/model/TaskModel");
const CommentModel = require("../DAL/model/CommentModel");
const upload = require("../middleware/Upload");
const fs = require("fs");
const path = require("path");

const userModel = new UserModel();
const taskModel = new TaskModel();
const commentModel = new CommentModel();

class CommentController {
  addComment = async (req, res) => {
    try {
      const comment = req.body.comment;
      comment.senderID = req.user;

      //Tải img cho comment
      if (comment.img) {
        let uploadImage = await upload(comment.img);

        let img = {
          // url: `https://x-career-06-team1-be.as.r.appspot.com/static/images/${Date.now().toString()}-image.png`,
          url: `http://localhost:3002/static/images/${Date.now().toString()}-image.png`,
          data: fs.writeFile(
            path.join(
              `./myApp/public/images/${Date.now().toString()}-image.png`
            ),
            uploadImage.data,
            function (err) {
              if (err) throw err;
            }
          ),
        };

        comment.img = img.url;
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

      const users = await userModel.findById(task[0].userIDs);
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      };

      const comment = await commentModel.getCommentByTaskId(taskID, options);

      return res.status(200).json({
        success: true,
        comment,
        users,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  };

  updateCommentById = async (req, res) => {
    const id = req.query.id;
    const comment = req.body.comment;
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

  deleteCommentById = async (req, res) => {
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
