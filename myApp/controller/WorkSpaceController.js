const { workSpaceUpdateValidate } = require("../middleware/Validate.js");
const WorkSpaceModel = require("../DAL/model/WorkSpaceModel");
const UserModel = require("../DAL/model/UserModel");
const upload = require("../middleware/Upload");
const fs = require("fs");
const path = require("path");

const workspaceModel = new WorkSpaceModel();
const userModel = new UserModel();

class WorkSpaceController {
  createWorkSpace = async (req, res) => {
    const newWorkSpace = req.body.workSpace;
    newWorkSpace.userID = req.user;

    const user = await userModel.findById(newWorkSpace.userID);
    newWorkSpace.userIDs = user;

    //Tải img cho workspace
    if (newWorkSpace.logo) {
      let uploadImage = await upload(newWorkSpace.logo);

      let img = {
        // url: `https://x-career-06-team1-be.as.r.appspot.com/static/images/${Date.now().toString()}-image.png`,
        url: `http://localhost:3002/static/images/${Date.now().toString()}-image.png`,
        data: fs.writeFile(
          path.join(`./myApp/public/images/${Date.now().toString()}-image.png`),
          uploadImage.data,
          function (err) {
            if (err) throw err;
          }
        ),
      };

      newWorkSpace.logo = img.url;
    }

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

  getWorkSpaceByID = async (req, res) => {
    const id = req.query.id;

    const data = await workspaceModel.boardAggregate(id);
    if (data.length > 0) res.json(data);
    else res.json("Workspace dose not exist");
  };

  getWorkSpaceByName = (req, res) => {
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

  updateWorkSpaceById = async (req, res) => {
    const { value, error } = workSpaceUpdateValidate(req.body.workSpace);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.query.id;

    //Tải img cho workspace
    if (value.logo) {
      let uploadImage = await upload(value.logo);

      let img = {
        // url: `https://x-career-06-team1-be.as.r.appspot.com/static/images/${Date.now().toString()}-image.png`,
        url: `http://localhost:3002/static/images/${Date.now().toString()}-image.png`,
        data: fs.writeFile(
          path.join(`./myApp/public/images/${Date.now().toString()}-image.png`),
          uploadImage.data,
          function (err) {
            if (err) throw err;
          }
        ),
      };

      value.logo = img.url;
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

  deleteWorkSpaceById = async (req, res) => {
    const id = req.query.id;
    const result = await workspaceModel.delete(id);

    if (result) res.json("Succesfully delete");
    else res.json("Sorry, something went wrong");
  };
}

module.exports = WorkSpaceController;
