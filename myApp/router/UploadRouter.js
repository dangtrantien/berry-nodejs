const express = require("express");
const UploadRouter = express.Router();
const UploadController = require("../controller/UploadController");

const uploadController = new UploadController();

UploadRouter
  .post("/uploadFile", uploadController.uploadFile)
  .delete("/deleteByID", uploadController.deleteByID)
  .get("/getAllFilesOfAllTasks", uploadController.getAllFilesOfAllTasks);

module.exports = UploadRouter;
