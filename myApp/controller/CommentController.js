const CommentModel = require("../DAL/model/CommentModel");
const TaskModel = require("../DAL/model/TaskModel");

const commentModel = new CommentModel();
const taskModel = new TaskModel();

class CommentController {
  addComment = async (req, res) => {
    try {
      const comment = req.body.comment;
      comment.senderID = req.user;

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
