const mongoose = require("mongoose");
const UserSchema = require("./UserSchema");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    boardID: {
      type: mongoose.ObjectId,
      ref: "board",
      required: true,
    },
    describe: {
      type: String,
    },
    status: {
      type: Number,
    },
    day: {
      startTime: {
        type: String,
      },
      expirationDate: {
        type: String,
      },
      expirationTime: {
        type: String,
      },
      expired: {
        type: String,
      },
    },
    member: {
      type: Array.of(UserSchema),
    },
  },
  {
    timestamps: true,
  }
);

TaskSchema.path("_id").ref("task");

module.exports = TaskSchema;
