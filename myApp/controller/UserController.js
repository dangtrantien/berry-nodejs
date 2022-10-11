const { userUpdateValidate } = require("../middleware/Validate.js");
const UserModel = require("../model/UserModel.js");
class UserController {
    createUser = async (req, res) => {
        const newUser = new UserModel();
        newUser.name = req.body.name;
        newUser.password = req.body.password;
        newUser.email = req.body.email;
        const user = await newUser.save();
        res.send(user);
    }
    getAllUsers = (req, res) => {
        UserModel.find().exec((err, users) => {
            if (err) {
                res.send("Khong the lay thong tin users");
            } else {
                // console.log("Lay thanh cong thong tin tat ca users");
                // console.log(users);
                res.json(users);
            }
        });
    };
    getUserById = (req, res) => {
        UserModel.find({ _id: req.params.id }).exec((err, user) => {
            if (err) {
                res.send("Khong the lay thong tin user");
            } else {
                // console.log("Lay thanh cong thong tin user");
                // console.log(user);
                res.json(user);
            }
        });
    };
    updateUserById = (req, res) => {
        const { value, error } = userUpdateValidate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        UserModel.findOneAndUpdate(
            { _id: req.params.id },
            value,
            { new: true },
            (err) => {
                if (err) {
                    res.send("Da xay ra loi khi update thong tin");
                } else {
                    res.send("Update thong tin thanh cong");
                }
            }
        );
    };
    deleteUserById = (req, res) => {
        UserModel.findOneAndDelete({ _id: req.params.id }, (err) => {
            if (err) {
                res.send("Da co loi xay ra khi delete user");
            } else {
                res.send("Xoa user thanh cong");
            }
        });
    };


}
module.exports = UserController;