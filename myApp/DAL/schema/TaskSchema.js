const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    describe: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    boardID: {
      type: mongoose.ObjectId,
      ref: "board",
      required: true,
    },
    userIDs: {
      type: Array.of(mongoose.Types.ObjectId),
    },
  },
  {
    timestamps: true,
  }
);

TaskSchema.path("_id").ref("task");

module.exports = TaskSchema;
