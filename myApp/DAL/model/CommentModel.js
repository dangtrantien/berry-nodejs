const mongoose = require("mongoose");
const CommentSchema = require("../schema/CommentSchema");
const BaseModel = require("./baseModel");

class CommentModel extends BaseModel {
  constructor() {
    super("comment", CommentSchema);
  }

  addCommentInTask = async function (taskID, message, senderID) {
    try {
      const post = await this.model.create({
        taskID,
        message,
        senderID,
        readByRecipients: { readByUserID: senderID },
      });

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

  getConversationByTaskId = async function (taskID, options = {}) {
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
        // apply pagination
        { $skip: options.page * options.limit },
        { $limit: options.limit },
        { $sort: { createdAt: 1 } },
      ]);

      return aggregate;
    } catch (error) {
      throw error;
    }
  };

  markMessageRead = async function (taskID, currentUserOnlineId) {
    try {
      const aggregate = this.model.updateMany(
        {
          taskID,
          "readByRecipients.readByUserID": { $ne: currentUserOnlineId },
        },
        {
          $addToSet: {
            readByRecipients: { readByUserID: currentUserOnlineId },
          },
        },
        {
          multi: true,
        }
      );

      return aggregate;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CommentModel;
