const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema(
  {
    workSpaceID: {
      type: mongoose.ObjectId,
      ref: "workspace",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TicketSchema.path("_id").ref("ticket");

module.exports = TicketSchema;
