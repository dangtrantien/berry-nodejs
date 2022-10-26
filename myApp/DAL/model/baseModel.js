const mongoose = require("mongoose");

class BaseModel {
  constructor(name, schema) {
    //Tạo collection
    this.model = mongoose.model(name, schema);
  }

  //Tìm kiếm tất cả dữ liệu trong collection (lược bỏ/giới hạn/sắp xếp)
  getAll = function (skip, limit, orderBy) {
    const query = this.model
      .find({})
      .skip(skip ? skip : 0)
      .limit(limit ? limit : 10)
      .sort(orderBy);

    return query.exec();
  };

  //Đếm số lượng data trong collection
  count = function () {
    const query = this.model.count({});

    return query.exec();
  };

  //Tạo mới db
  createNew = async function (data) {
    return this.model.create(data);
  };

  //Tìm theo id
  findById = async function (id) {
    return this.model.find({ _id: id });
  };

  //Tìm theo tên
  findByName = async function (name) {
    return this.model.find({ name: name });
  };

  //Cập nhật theo id
  update = async function (id, data) {
    return this.model.findOneAndUpdate({ _id: id }, data, { new: true });
  };

  //Xóa theo id
  delete = async function (id) {
    return this.model.findOneAndDelete({ _id: id });
  };
}

module.exports = BaseModel;
