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
    member: {
      type: Array.of(UserSchema),
    },
    bgImg: {
      type: Object,
      default: {
        name: "",
        type: "",
        data: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

BoardSchema.path("_id").ref("board");

module.exports = BoardSchema;
