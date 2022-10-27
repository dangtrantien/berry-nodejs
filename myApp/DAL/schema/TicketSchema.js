const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./UserSchema");

const TicketSchema = new Schema(
  {
    workSpaceID: {
      type: mongoose.ObjectId,
      ref: "workspace",
      required: true,
    },
    discribe: {
      type: String,
    },
    users: [UserSchema],
    // status: {},
  },
  {
    timestamps: true,
  }
);

TicketSchema.path("_id").ref("ticket");

module.exports = TicketSchema;
