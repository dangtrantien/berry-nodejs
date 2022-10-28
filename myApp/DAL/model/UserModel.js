const UserSchema = require("../schema/UserSchema");
const BaseModel = require("./baseModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

class UserModel extends BaseModel {
  constructor() {
    super("user", UserSchema);
  }

  //Tìm user dựa vào email
  findByEmail = function (e) {
    const query = this.model.find({ email: e }).limit(1);

    return query.exec();
  };

  //Tạo token cho user
  generateAccessToken = function (email) {
    return jwt.sign({ email }, process.env.TOKEN_SECRET);
  };
}

module.exports = UserModel;
