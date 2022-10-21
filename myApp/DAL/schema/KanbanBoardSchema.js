const mongoose = require("mongoose");
const TicketSchema = require("./TicketSchema");
const Schema = mongoose.Schema;

const KanbanBoardSchema = new Schema({
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
  workSpaceID: {
    type: mongoose.ObjectId,
    ref: "workspace",
    required: true,
  },
  tickets: {
    type: Array,
    value: TicketSchema,
  },
  lastUpdatedDate: {
    type: String,
  },
});

KanbanBoardSchema.path("_id").ref("kanbanboard");

module.exports = KanbanBoardSchema;
