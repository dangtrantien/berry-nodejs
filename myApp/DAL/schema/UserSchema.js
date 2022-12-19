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
    avatar: {
      type: Object,
      default: {
        name: "",
        type: "",
        data: "",
      },
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    group: {
      type: String,
    },
    position: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.path("_id").ref("user");

module.exports = UserSchema;
