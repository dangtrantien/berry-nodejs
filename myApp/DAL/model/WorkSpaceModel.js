const mongoose = require("mongoose");
const WorkSpaceSchema = require("../schema/WorkSpaceSchema");
const BaseModel = require("./baseModel");

class WorkSpaceModel extends BaseModel {
  constructor() {
    super("workspace", WorkSpaceSchema);
  }

  //Liên kết workspace vs user
  userAggregate = async function () {
    const agg = [
      {
        $lookup: {
          from: "users",
          localField: "userID",
          foreignField: "_id",
          as: "userID",
        },
      },
      { $unwind: "$userID" },
    ];

    const result = await this.model.aggregate(agg);

    return result;
  };

  //Liên kết 1 workspace vs ticket
  ticketAggregate = async function (id) {
    const agg = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(`${id}`),
        },
      },
      {
        $lookup: {
          from: "tickets",
          localField: "_id",
          foreignField: "workSpaceID",
          as: "tickets",
        },
      },
      {
        $addFields: {
          ticket_count: {
            $size: "$tickets",
          },
        },
      },
    ];

    const result = await this.model.aggregate(agg);

    return result;
  };
}

module.exports = WorkSpaceModel;
