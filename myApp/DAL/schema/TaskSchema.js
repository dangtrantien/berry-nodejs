const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./UserSchema");

const TaskSchema = new Schema(
  {
    boardID: {
      type: mongoose.ObjectId,
      ref: "board",
      required: true,
    },
    describe: {
      type: String,
      required: true,
    },
    status: {
      type: Array,
    },
    users: [UserSchema],
  },
  {
    timestamps: true,
  }
);

TaskSchema.path("_id").ref("task");

module.exports = TaskSchema;
