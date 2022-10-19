const obj = require("mongodb").ObjectId;
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

    getAllWorkSpacesOfAllUsers = async (req, res) => {
        const agg = [
            {
                $lookup: {
                    from: "workspaces",
                    localField: "_id",
                    foreignField: "userID",
                    as: "workSpaces"
                }
            }
        ]
        var result = await UserModel.aggregate(agg)
        res.send(result)
        res.send(result.length)

    };

    // getAllWorkSpaceOfUser = async (req, res) => {
    //     var userid= new obj(req.query.id)
    //     const agg = [
    //         {
    //             $lookup: {
    //                 from: "workspaces",
    //                 localField: "_id",
    //                 foreignField: "userID",
    //                 as: "workSpaces"
    //             }
    //         }  ,
    //         {
    //             $match: { _id: userid},
    //         }
            
    //     ]
    //     var result = await UserModel.aggregate(agg)
    //     res.send(result)
    // };

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
    register = async (req, res) => {
        // 1. Validate user info
        const { error } = registerValidate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        // 2. Check email exist in db
        const emailExists = await UserModel.findOne({ email: req.body.email });
        if (emailExists) return res.status(400).send("Email exists in db");
        // 3. Bcryptjs to encrypt password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);
        // 4. Create a new user
        const newUser = new UserModel();
        newUser.name = req.body.name;
        newUser.phone = req.body.phone;
        newUser.email = req.body.email;
        newUser.passwordHash = hashPassword;

        // 5. Return user for client
        try {
            const user = await newUser.save();
            res.send(user);
        } catch (e) {
            console.log("Has Error !!!");
            res.status(400).send(e);
        }
    };

    login = async (req, res) => {
        // 1. Validate user info
        const { error } = loginValidate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // 2. Check email of user exists in db
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Email not exists in db");

        // 3. check password in database
        const loginPassword = await bcrypt.compareSync(
            req.body.password,
            user.passwordHash
        );
        if (!loginPassword) return res.status(400).send("Password Incorrect");
        // 4. generated token string
        const token = jwt.sign({ id: user._id }, "chuoibimatkhongthetietlo");
        const tokenn = jwt.sign({})
        // 5. Return token for user
        res.header("auth-token", token).send(token);
    };

}
module.exports = UserController;