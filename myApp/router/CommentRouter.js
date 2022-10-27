const express = require("express");
const CommentRouter = express.Router();
const CommentController = require("../controller/CommentController");

const commentController = new CommentController();

CommentRouter
  .get("/:taskID", commentController.getConversationByTaskID)
  .post("/:taskID/addComment", commentController.addComment)
  .delete("/deleteCommentById", commentController.deleteCommentById)
  .put(
    "/:taskID/markConversationReadByTaskID",
    commentController.markConversationReadByTaskID
  );

module.exports = CommentRouter;
