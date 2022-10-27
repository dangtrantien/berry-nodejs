const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Trạng thái đã xem comment
const ReadByRecipientSchema = new mongoose.Schema(
  {
    _id: false,
    readByUserID: {
      type: mongoose.ObjectId,
      ref: "user",
    },
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
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
    readByRecipients: [ReadByRecipientSchema],
  },
  {
    timestamps: true,
  }
);

CommentSchema.path("_id").ref("comment");

module.exports = CommentSchema;
