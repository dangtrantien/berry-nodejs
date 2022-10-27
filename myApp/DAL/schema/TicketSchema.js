const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = require("./CommentSchema");

const TicketSchema = new Schema(
  {
    workSpaceID: {
      type: mongoose.ObjectId,
      ref: "workspace",
      required: true,
    },
    userID: {
      type: mongoose.ObjectId,
      ref: "user",
    },
    discribe: {
      type: String,
    },
    comments: [CommentSchema],
    // status: {},
  },
  {
    timestamps: true,
  }
);

TicketSchema.path("_id").ref("ticket");

module.exports = TicketSchema;
