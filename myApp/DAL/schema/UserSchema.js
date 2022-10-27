const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WorkSpaceSchema = require("./WorkSpaceSchema");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    avatar: {
      type: String, //base64
    },
    workSpaces: [WorkSpaceSchema],
    //or
    // workSpaces:Array.of(WorkSpaceSchema)
    //or
    // workSpaces: {
    //   type: Array,
    //   value: WorkSpaceSchema,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;
