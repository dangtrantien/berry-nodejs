const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  },
  {
    timestamps: true,
  }
);

UserSchema.path("_id").ref("user");

module.exports = UserSchema;
