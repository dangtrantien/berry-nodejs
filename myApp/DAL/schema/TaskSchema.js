const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./UserSchema");

const TaskSchema = new Schema(
  {
    ticketID: {
      type: mongoose.ObjectId,
      ref: "ticket",
      required: true,
    },
    describe: {
      type: String,
      required: true,
    },
    users: [UserSchema],
    // status: {},
  },
  {
    timestamps: true,
  }
);

TaskSchema.path("_id").ref("task");

module.exports = TaskSchema;
