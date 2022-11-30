const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = Schema(
  {
    message: {
      type: String,
      required: true,
    },
    senderID: {
      type: mongoose.ObjectId,
      ref: "user",
    },
    taskID: {
      type: mongoose.ObjectId,
      ref: "task",
      required: true,
    },
    img: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

CommentSchema.path("_id").ref("comment");

module.exports = CommentSchema;
