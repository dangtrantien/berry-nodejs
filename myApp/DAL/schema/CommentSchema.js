const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MESSAGE_TYPES = {
  TYPE_TEXT: "text",
};

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
    message: mongoose.Schema.Types.Mixed,
    type: {
      type: String,
      default: () => MESSAGE_TYPES.TYPE_TEXT,
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
