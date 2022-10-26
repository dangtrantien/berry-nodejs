const mongoose = require("mongoose");
const UserSchema = require("./UserSchema");
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
      require: true,
    },
    senderID: {
      type: mongoose.ObjectId,
      ref: "user",
      require: true,
    },
    ticketID: {
      type: mongoose.ObjectId,
      ref: "ticket",
      require: true,
    },
    readByRecipients: [ReadByRecipientSchema],
    user: {
      type: Array,
      value: UserSchema,
    },
  },
  {
    timestamps: true,
  }
);

CommentSchema.path("_id").ref("comment");

module.exports = CommentSchema;
