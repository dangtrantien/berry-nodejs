const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReplyMessage = Schema(
  {
    message: {
      type: String,
      required: true,
    },
    senderID: {
      type: mongoose.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentSchema = Schema(
  {
    message: {
      type: String,
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
    reply: {
      type: Array.of(ReplyMessage),
    },
    image: {
      type: Object,
      default: {
        name: "",
        data: "",
      },
    },
    audio: {
      type: Object,
      default: {
        name: "",
        data: "",
      },
    },
    document: {
      type: Object,
      default: {
        name: "",
        data: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

CommentSchema.path("_id").ref("comment");

module.exports = CommentSchema;
