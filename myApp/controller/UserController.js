const { userUpdateValidate } = require("../middleware/Validate");
const UserModel = require("../DAL/model/UserModel");
const { upload } = require("../middleware/Upload");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const userModel = new UserModel();

class UserController {
  createUser = async (req, res) => {
    const newUser = req.body.user;

    //Mã hóa password
    const hashPassword = bcrypt.hashSync(newUser.password, 10);
    newUser.passwordHash = hashPassword;

    //Kiểm tra email có tồn tại trong db
    userModel.findByEmail(newUser.email).then((emailExists) => {
      if (emailExists.length > 0) res.status(400).send("Email exists in db");
      else {
        userModel
          .createNew(newUser)
          .then((data) => res.send(data))
          .catch((err) => {
            throw err;
          });
      }
    });
  };

  getAllUsers = (req, res) => {
    userModel
      .getAll(req.query.skip, req.query.limit, req.query.orderBy)
      .then((data) => {
        res.json({
          length: data.length,
          data: data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  getByID = (req, res) => {
    const id = req.query.id;

    userModel
      .findById(id)
      .then((data) => {
        if (data.length > 0) res.json(data);
        else res.json("User dose not exist");
      })
      .catch((err) => {
        throw err;
      });
  };

  updateUserByID = async (req, res) => {
    const { value, error } = userUpdateValidate(req.body.user);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.query.id;

    if (value.password) {
      const hashPassword = bcrypt.hashSync(value.password, 10);
      value.passwordHash = hashPassword;
    }

    //Tải avatar cho user
    if (value.avatar) {
      let uploadImage = await upload(value.avatar);

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

      value.avatar = {
        name: img.name,
        type: img.type,
        data: img.url,
      };
    }

    const result = await userModel.update(id, value);

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
    const result = await userModel.delete(id);

    if (result) res.json("Succesfully delete");
    else res.json("Sorry, something went wrong");
  };

  //Đăng nhập
  login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    userModel.findByEmail(email).then((data) => {
      //Kiểm tra xem có tồn tại user hay không
      if (data.length > 0) {
        //Có tồn tại
        //So sánh password vs password đã đk mã hóa
        const loginPassword = bcrypt.compareSync(
          password,
          data[0].passwordHash
        );
        if (!loginPassword) return res.status(400).send("Password Incorrect");
        else {
          const token = userModel.generateAccessToken({ _id: data[0]._id });

          res.json({ existed: true, token: token, id: data[0]._id });
        }
      } else {
        //Không tồn tại
        res.status(400).send({ existed: false, token: "", id: "" });
      }
    });
  };
}

module.exports = UserController;
