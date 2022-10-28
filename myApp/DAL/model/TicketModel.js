const mongoose = require("mongoose");
const TicketSchema = require("../schema/TicketSchema");
const BaseModel = require("./baseModel");

class TicketModel extends BaseModel {
  constructor() {
    super("ticket", TicketSchema);
  }

  //Liên kết ticket vs workspace
  workspaceAggregate = async function () {
    const agg = [
      {
        $lookup: {
          from: "workspaces",
          localField: "workSpaceID",
          foreignField: "_id",
          as: "workSpaceID",
        },
      },
      { $unwind: "$workSpaceID" },
    ];

    const result = await this.model.aggregate(agg);

    return result;
  };
  
  //Liên kết 1 ticket vs task
  taskAggregate = async function (id) {
    const agg = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(`${id}`),
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "ticketID",
          as: "tasks",
        },
      },
      {
        $addFields: {
          task_count: {
            $size: "$tasks",
          },
        },
      },
    ];

    const result = await this.model.aggregate(agg);

    return result;
  };
}

module.exports = TicketModel;
