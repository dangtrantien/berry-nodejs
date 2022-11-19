const { userUpdateValidate } = require("../middleware/Validate");
const UserModel = require("../DAL/model/UserModel");
const upload = require("../middleware/Upload");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const userModel = new UserModel();
const saltRounds = 10;

class UserController {
  createUser = async (req, res) => {
    // const newUser = new UserModel();
    // newUser.name = req.body.name;
    // newUser.password = req.body.password;
    // newUser.email = req.body.email;
    // const user = await newUser.save();
    // res.send(user);

    const newUser = req.body.user;
    // newUser:{
    //     name,
    //     email,
    //     password
    // }

    //Mã hóa password
    const hashPassword = bcrypt.hashSync(newUser.password, saltRounds);
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
    // UserModel.find().exec((err, users) => {
    //   if (err) {
    //     res.send("Khong the lay thong tin users");
    //   } else {
    //     // console.log("Lay thanh cong thong tin tat ca users");
    //     // console.log(users);
    //     res.json(users);
    //   }
    // });

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

  getUserById = (req, res) => {
    // UserModel.find({ _id: req.query.id }).exec((err, user) => {
    //   if (err) {
    //     res.send("Khong the lay thong tin user");
    //   } else {
    //     // console.log("Lay thanh cong thong tin user");
    //     // console.log(user);
    //     res.json(user);
    //   }
    // });

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

  updateUserById = async (req, res) => {
    const { value, error } = userUpdateValidate(req.body.user);
    if (error) return res.status(400).send(error.details[0].message);

    // UserModel.findOneAndUpdate(
    //   { _id: req.query.id },
    //   value,
    //   { new: true },
    //   (err) => {
    //     if (err) {
    //       res.send("Da xay ra loi khi update thong tin");
    //     } else {
    //       res.send("Update thong tin thanh cong");
    //     }
    //   }
    // );

    const id = req.query.id;

    if (value.password) {
      const hashPassword = bcrypt.hashSync(value.password, saltRounds);
      value.passwordHash = hashPassword;
    }

    //Tải avatar cho user
    if (value.avatar) {
      let uploadImage = await upload(value.avatar);

      let img = {
        url: `https://x-career-06-team1-be.as.r.appspot.com/static/images/${Date.now().toString()}-image.png`,
        // url: `http://localhost:3002/static/images/${Date.now().toString()}-image.png`,
        data: fs.writeFile(
          path.join(`./myApp/public/images/${Date.now().toString()}-image.png`),
          uploadImage.data,
          function (err) {
            if (err) throw err;
          }
        ),
      };

      value.avatar = img.url;
    }

    const result = await userModel.update(id, value);

    if (result) res.send({ success: true, message: "Succesfully updated" });
    else
      res.send({
        success: false,
        message: "Sorry, something went wrong",
      });
  };

  deleteUserById = async (req, res) => {
    // UserModel.findOneAndDelete({ _id: req.query.id }, (err) => {
    //   if (err) {
    //     res.send("Da co loi xay ra khi delete user");
    //   } else {
    //     res.send("Xoa user thanh cong");
    //   }
    // });

    const id = req.query.id;
    const result = await userModel.delete(id);

    if (result) res.json("Succesfully delete");
    else res.json("Sorry, something went wrong");
  };

  //Đăng nhập
  login = async (req, res) => {
    // // 1. Validate user info
    // const { error } = loginValidate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // // 2. Check email of user exists in db
    // const user = await UserModel.findOne({ email: req.body.email });
    // if (!user) return res.status(400).send("Email not exists in db");

    // // 3. check password in database
    // const loginPassword = await bcrypt.compareSync(
    //   req.body.password,
    //   user.passwordHash
    // );
    // if (!loginPassword) return res.status(400).send("Password Incorrect");
    // // 4. generated token string
    // const token = jwt.sign({ id: user._id }, "chuoibimatkhongthetietlo");
    // const tokenn = jwt.sign({});
    // // 5. Return token for user
    // res.header("auth-token", token).send(token);

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
        res.json({ existed: false, token: "", id: "" });
      }
    });
  };
}

module.exports = UserController;
