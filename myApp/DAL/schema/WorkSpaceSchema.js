const mongoose = require("mongoose");
const UserSchema = require("./UserSchema");
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
    member: {
      type: Array.of(UserSchema),
    },
    logo: {
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

WorkSpaceSchema.path("_id").ref("workspace");

module.exports = WorkSpaceSchema;
