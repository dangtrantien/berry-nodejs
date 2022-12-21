const { workSpaceUpdateValidate } = require("../middleware/Validate.js");
const WorkSpaceModel = require("../DAL/model/WorkSpaceModel");
const UserModel = require("../DAL/model/UserModel");
const { upload } = require("../middleware/Upload");
const fs = require("fs");
const path = require("path");

const workspaceModel = new WorkSpaceModel();
const userModel = new UserModel();

class WorkSpaceController {
  createWorkSpace = async (req, res) => {
    const newWorkSpace = req.body.workSpace;
    newWorkSpace.userID = req.user;

    const user = await userModel.findById(newWorkSpace.userID);
    newWorkSpace.member = user;

    workspaceModel
      .createNew(newWorkSpace)
      .then((data) => res.send(data))
      .catch((err) => {
        throw err;
      });
  };

  getAllWorkSpacesOfAllUsers = async (req, res) => {
    const data = await workspaceModel.userAggregate();
    res.json({ length: data.length, data: data });
  };

  getByID = async (req, res) => {
    const id = req.query.id;

    const data = await workspaceModel.boardAggregate(id);
    if (data.length > 0) res.json(data);
    else res.json("Workspace dose not exist");
  };

  getByName = (req, res) => {
    const name = req.query.name;

    workspaceModel
      .findByName(name)
      .then((data) => {
        if (data.length > 0) res.json(data);
        else res.json("Workspace dose not exist");
      })
      .catch((err) => {
        throw err;
      });
  };

  updateWorkSpaceByID = async (req, res) => {
    const { value, error } = workSpaceUpdateValidate(req.body.workSpace);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.query.id;

    //Tải img cho workspace
    if (value.logo) {
      let uploadImage = await upload(value.logo);

      let img = {
        name: uploadImage.name,
        type: uploadImage.type,
        url: `https://x-career-nodejs-bx4avucmoa-as.a.run.app/static/images/${uploadImage.name}`,
        // url: `http://localhost:3002/static/images/${uploadImage.name}`,
        data: fs.writeFile(
          path.join(`./myApp/public/images/${uploadImage.name}`),
          uploadImage.data,
          function (err) {
            if (err) throw err;
          }
        ),
      };

      value.logo = {
        name: img.name,
        type: img.type,
        data: img.url,
      };
    }

    const result = await workspaceModel.update(id, value);

    if (result)
      res.send({ success: true, message: "Succesfully updated", data: result });
    else
      res.send({
        success: false,
        message: "Sorry, something went wrong",
      });
  };

  deleteByID = async (req, res) => {
    const id = req.query.id;
    const result = await workspaceModel.delete(id);

    if (result) res.json("Succesfully delete");
    else res.json("Sorry, something went wrong");
  };
}

module.exports = WorkSpaceController;
