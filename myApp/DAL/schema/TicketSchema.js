const mongoose = require("mongoose");
const CommentSchema = require("./CommentSchema");
const Schema = mongoose.Schema;

const TicketSchema = new Schema(
  {
    kanbanBoardID: {
      type: mongoose.ObjectId,
      ref: "kanbanBoard",
      required: true,
    },
    // status: {},
    userID: {
      type: mongoose.ObjectId,
      ref: "user",
    },
    discribe: {
      type: String,
    },
    comments: {
      type: Array,
      value: CommentSchema,
    },
  },
  {
    timestamps: true,
  }
);

TicketSchema.path("_id").ref("ticket");

module.exports = TicketSchema;
