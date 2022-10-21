const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WorkSpaceSchema = require("./WorkSpaceSchema");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
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
    default: "",
  },
  // workSpaces:[WorkSpaceSchema]

  // workSpaces:Array.of(WorkSpaceSchema)
  //or
  workSpaces: {
    type: Array,
    value: WorkSpaceSchema,
  },
  lastUpdatedDate: {
    type: String,
  },
});

module.exports = UserSchema;
