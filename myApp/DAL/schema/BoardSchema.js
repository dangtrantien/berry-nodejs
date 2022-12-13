const mongoose = require("mongoose");
const UserSchema = require("./UserSchema");
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
    userID: {
      type: mongoose.ObjectId,
      ref: "workspace",
      required: true,
    },
    bgImg: {
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

BoardSchema.path("_id").ref("board");

module.exports = BoardSchema;
