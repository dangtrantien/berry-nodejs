const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = Schema(
  {
    message: {
      type: {},
      required: true,
    },
    senderID: {
      type: mongoose.ObjectId,
      ref: "user",
      required: true,
    },
    taskID: {
      type: mongoose.ObjectId,
      ref: "task",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

CommentSchema.path("_id").ref("comment");

module.exports = CommentSchema;
