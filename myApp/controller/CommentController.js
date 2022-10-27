const UserModel = require("../DAL/model/UserModel");
const TaskModel = require("../DAL/model/TaskModel");
const CommentModel = require("../DAL/model/CommentModel");

const userModel = new UserModel();
const taskModel = new TaskModel();
const commentModel = new CommentModel();

class CommentController {
  addComment = async (req, res) => {
    try {
      const { taskID } = req.params;
      const message = req.body.message;
      const senderID = req.senderID;

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

  getConversationByTaskID = async (req, res) => {
    try {
      const { taskID } = req.params;
      const task = await taskModel.findById(taskID);
      if (!task) {
        return res.status(400).json({
          success: false,
          message: "No task exists for this id",
        });
      }

      const users = await userModel.findById(task[0].userID);
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

  markConversationReadByTaskID = async (req, res) => {
    try {
      const { taskID } = req.params;
      const task = await taskModel.findById(taskID);
      if (!task) {
        return res.status(400).json({
          success: false,
          message: "No task exists for this id",
        });
      }

      const currentLoggedUser = req.userId;
      const result = await commentModel.markMessageRead(
        taskID,
        currentLoggedUser
      );

      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  };

  deleteCommentById = async (req, res) => {
    const id = req.query.id;
    const result = await commentModel.delete(id);

    if (result) res.json("Succesfully delete");
    else res.json("Sorry, something went wrong");
  };
}

module.exports = CommentController;
