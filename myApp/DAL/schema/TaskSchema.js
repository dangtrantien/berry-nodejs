const mongoose = require("mongoose");
const UserSchema = require("./UserSchema");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    describe: {
      type: String,
    },
    status: {
      type: Number,
    },
    boardID: {
      type: mongoose.ObjectId,
      ref: "board",
      required: true,
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
