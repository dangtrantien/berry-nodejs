const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UploadSchema = Schema(
  {
    taskID: {
      type: mongoose.ObjectId,
      ref: "task",
    },
    file: {
      type: Object,
      default: {
        name: "",
        type: "",
        url: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

UploadSchema.path("_id").ref("upload");

module.exports = UploadSchema;
