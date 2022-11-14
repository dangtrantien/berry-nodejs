const UserModel = require("../DAL/model/UserModel");
const TaskModel = require("../DAL/model/TaskModel");
const CommentModel = require("../DAL/model/CommentModel");
const upload = require("../middleware/Upload");

const userModel = new UserModel();
const taskModel = new TaskModel();
const commentModel = new CommentModel();

class CommentController {
  addComment = async (req, res) => {
    try {
      const taskID = req.body.comment.taskID;
      const message = req.body.comment.message;
      const senderID = req.user;

      const post = await commentModel.addCommentInTask(
        taskID,
        message,
        senderID
      );

      global.io.sockets.in(taskID).emit("new message", { message: post });

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

      const conversation = await commentModel.getConversationByTaskId(
        taskID,
        options
      );

      return res.status(200).json({
        success: true,
        conversation,
        users,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  };

  markCommentReadByTaskID = async (req, res) => {
    try {
      const taskID = req.query.id;
      const task = await taskModel.findById(taskID);
      if (!task) {
        return res.status(400).json({
          success: false,
          message: "No task exists for this id",
        });
      }

      const currentLoggedUser = req.user;
      const result = await commentModel.markMessageRead(
        taskID,
        currentLoggedUser
      );

      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  };

  updateCommentById = async (req, res) => {
    const id = req.query.id;
    const comment = req.body.comment;
    const result = await commentModel.update(id, comment);

    if (result) res.json("Succesfully update");
    else res.json("Sorry, something went wrong");
  };

  deleteCommentById = async (req, res) => {
    const id = req.query.id;
    const result = await commentModel.delete(id);

    if (result) res.json("Succesfully delete");
    else res.json("Sorry, something went wrong");
  };
}

module.exports = CommentController;
