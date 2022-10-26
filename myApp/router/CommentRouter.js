const express = require("express");
const CommentRouter = express.Router();
const CommentController = require("../controller/CommentController");

const commentController = new CommentController();

CommentRouter
  .get("/:ticketID", commentController.getConversationByTicketID)
  .post("/:ticketID/addComment", commentController.addComment)
  .delete("/deleteCommentById", commentController.deleteCommentById)
  .put(
    "/:ticketID/markConversationReadByTicketID",
    commentController.markConversationReadByTicketID
  );

module.exports = CommentRouter;
