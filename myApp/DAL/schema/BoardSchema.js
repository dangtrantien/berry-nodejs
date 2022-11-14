const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    workSpaceID: {
      type: mongoose.ObjectId,
      ref: "workspace",
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

BoardSchema.path("_id").ref("board");

module.exports = BoardSchema;
