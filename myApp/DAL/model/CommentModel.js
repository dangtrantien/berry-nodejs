const mongoose = require("mongoose");
const CommentSchema = require("../schema/CommentSchema");
const BaseModel = require("./baseModel");

class CommentModel extends BaseModel {
  constructor() {
    super("comment", CommentSchema);
  }

  addCommentInTask = async function (data) {
    try {
      const post = await this.model.create(data);

      const aggregate = await this.model.aggregate([
        // get post where _id = post._id
        { $match: { _id: post._id } },
        // do a join on another table called users, and
        // get me a user whose _id = senderID
        {
          $lookup: {
            from: "users",
            localField: "senderID",
            foreignField: "_id",
            as: "senderID",
          },
        },
        { $unwind: "$senderID" },
        // do a join on another table called tasks, and
        // get me a task whose _id = taskID
        {
          $lookup: {
            from: "tasks",
            localField: "taskID",
            foreignField: "_id",
            as: "taskID",
          },
        },
        { $unwind: "$taskID" },
      ]);

      return aggregate;
    } catch (error) {
      throw error;
    }
  };

  getCommentByTaskId = async function (taskID) {
    try {
      const aggregate = await this.model.aggregate([
        { $match: { taskID: mongoose.Types.ObjectId(taskID) } },
        { $sort: { createdAt: -1 } },
        // do a join on another table called users, and
        // get me a user whose _id = senderID
        {
          $lookup: {
            from: "users",
            localField: "senderID",
            foreignField: "_id",
            as: "senderID",
          },
        },
        { $unwind: "$senderID" },
      ]);

      return aggregate;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CommentModel;
