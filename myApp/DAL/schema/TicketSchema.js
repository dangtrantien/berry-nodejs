const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  kanbanBoardID: {
    type: mongoose.ObjectId,
    ref: "KanbanBoard",
    required: true,
  },
  status: {
    type: Boolean,
  },
  discribe: {
    type: String,
  },
  lastUpdatedDate: {
    type: String,
  },
});

TicketSchema.path("_id").ref("ticket");

module.exports = TicketSchema;
