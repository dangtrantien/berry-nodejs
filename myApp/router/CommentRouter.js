const express = require("express");
const CommentRouter = express.Router();
const CommentController = require("../controller/CommentController");

const commentController = new CommentController();

CommentRouter
  .post("/addComment", commentController.addComment)
  .get("/getConversationByTaskID", commentController.getConversationByTaskID)
  .delete("/deleteCommentById", commentController.deleteCommentById)
  .put(
    "/markConversationReadByTaskID",
    commentController.markConversationReadByTaskID
  );

module.exports = CommentRouter;
