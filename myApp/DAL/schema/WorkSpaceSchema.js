const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TicketSchema = require("./TicketSchema");

const WorkSpaceSchema = new Schema(
  {
    // _id: mongoose.ObjectId,
    name: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.ObjectId,
      ref: "user",
      required: true,
    },
    tickets: [TicketSchema],
  },
  {
    timestamps: true,
  }
);

WorkSpaceSchema.path("_id").ref("workspace");

module.exports = WorkSpaceSchema;
