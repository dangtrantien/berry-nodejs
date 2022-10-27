const CommentSchema = require("../schema/CommentSchema");
const BaseModel = require("./baseModel");

class CommentModel extends BaseModel {
  constructor() {
    super("comment", CommentSchema);
  }

  addCommentInTicket = async function (ticketID, message, senderID) {
    try {
      const post = await this.model.create({
        ticketID,
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
        // do a join on another table called tickets, and
        // get me a ticket whose _id = ticketID
        {
          $lookup: {
            from: "tickets",
            localField: "ticketID",
            foreignField: "_id",
            as: "ticketID",
          },
        },
        { $unwind: "$ticketID" },
      ]);

      return aggregate;
    } catch (error) {
      throw error;
    }
  };

  getConversationByTicketId = async function (ticketID, options = {}) {
    try {
      return this.model.aggregate([
        { $match: { ticketID } },
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
    } catch (error) {
      throw error;
    }
  };

  markMessageRead = async function (ticketID, currentUserOnlineId) {
    try {
      return this.model.updateMany(
        {
          ticketID,
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
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CommentModel;
