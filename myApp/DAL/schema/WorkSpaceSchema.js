const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkSpaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.ObjectId,
      ref: "user",
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

WorkSpaceSchema.path("_id").ref("workspace");

module.exports = WorkSpaceSchema;
