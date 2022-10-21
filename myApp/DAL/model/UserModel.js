const UserSchema = require("../schema/UserSchema");
const BaseModel = require("./baseModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

class UserModel extends BaseModel {
  constructor() {
    super("user", UserSchema);
  }

  //Liên kết user vs workspace
  workSpaceAggregate = async function () {
    const agg = [
      {
        $lookup: {
          from: "workspaces",
          localField: "_id",
          foreignField: "userID",
          as: "workSpaces",
        },
      },
    ];

    const result = await this.model.aggregate(agg);

    return result;
  };

  //Tìm user có email vs password
  findByEmailAndPassword = function (e, p) {
    const query = this.model.findOne({ email: e }, { password: p });

    return query.exec();
  };

  //Tạo token cho user
  generateAccessToken = function (email) {
    return jwt.sign({ email }, process.env.TOKEN_SECRET);
  };
}

module.exports = UserModel;
