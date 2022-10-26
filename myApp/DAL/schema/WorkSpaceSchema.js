const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const KanbanBoardSchema = require("./KanbanBoardSchema");

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
    kanbanBoards: {
      type: Array,
      value: KanbanBoardSchema,
    },
  },
  {
    timestamps: true,
  }
);

WorkSpaceSchema.path("_id").ref("workspace");

module.exports = WorkSpaceSchema;
