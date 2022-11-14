const express = require("express");
const auth = require("../middleware/AuthToken");
const CommentRouter = express.Router();
const CommentController = require("../controller/CommentController");

const commentController = new CommentController();

CommentRouter
  .post("/addComment", auth, commentController.addComment)
  .get("/getCommentByTaskID", commentController.getCommentByTaskID)
  .put("/markCommentReadByTaskID", commentController.markCommentReadByTaskID)
  .put("/updateCommentById", commentController.updateCommentById)
  .delete("/deleteCommentById", commentController.deleteCommentById);

module.exports = CommentRouter;
