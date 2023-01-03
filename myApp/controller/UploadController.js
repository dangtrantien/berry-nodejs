const UploadModel = require("../DAL/model/UploadModel");
const { upload } = require("../middleware/Upload");
const fs = require("fs");
const path = require("path");

const uploadModel = new UploadModel();

class UploadController {
  uploadFile = async (req, res) => {
    const fileData = req.body.upload;

    let uploadFile = await upload(fileData.file);

    if (uploadFile.type.match(/[^:/]\w+\//)[0] === "image/") {
      let value = {
        name: uploadFile.name,
        type: uploadFile.type,
        url: `https://x-career-06-team1-be.onrender.com/static/images/${uploadFile.name}`,
        // url: `http://localhost:3002/static/images/${uploadFile.name}`,
        data: fs.writeFile(
          path.join(`./myApp/public/images/${uploadFile.name}`),
          uploadFile.data,
          function (err) {
            if (err) throw err;
          }
        ),
      };

      fileData.file = {
        name: value.name,
        type: value.type,
        url: value.url,
      };
    } else if (uploadFile.type.match(/[^:/]\w+\//)[0] === "audio/") {
      let value = {
        name: uploadFile.name,
        type: uploadFile.type,
        url: `https://x-career-06-team1-be.onrender.com/static/audios/${uploadFile.name}`,
        // url: `http://localhost:3002/static/audios/${uploadFile.name}`,
        data: fs.writeFile(
          path.join(`./myApp/public/audios/${uploadFile.name}`),
          uploadFile.data,
          function (err) {
            if (err) throw err;
          }
        ),
      };

      fileData.file = {
        name: value.name,
        type: value.type,
        url: value.url,
      };
    } else {
      let value = {
        name: uploadFile.name,
        type: uploadFile.type,
        url: `https://x-career-06-team1-be.onrender.com/static/documents/${uploadFile.name}`,
        // url: `http://localhost:3002/static/documents/${uploadFile.name}`,
        data: fs.writeFile(
          path.join(`./myApp/public/documents/${uploadFile.name}`),
          uploadFile.data,
          function (err) {
            if (err) throw err;
          }
        ),
      };

      fileData.file = {
        name: value.name,
        type: value.type,
        url: value.url,
      };
    }

    uploadModel
      .createNew(fileData)
      .then((data) => res.send({ success: true, data: data }))
      .catch((err) => {
        res.send({
          success: false,
          message: err,
        });
      });
  };

  getAllFilesOfAllTasks = async (req, res) => {
    const data = await uploadModel.taskAggregate();
    res.json({ length: data.length, data: data });
  };

  deleteByID = async (req, res) => {
    const id = req.query.id;
    const result = await uploadModel.delete(id);

    if (result) res.json({ success: true, message: "Succesfully delete" });
    else res.json({ success: false, message: "Sorry, something went wrong" });
  };
}

module.exports = UploadController;
