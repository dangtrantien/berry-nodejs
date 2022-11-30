const mongoose = require("mongoose");
const BoardSchema = require("../schema/BoardSchema");
const BaseModel = require("./baseModel");

class BoardModel extends BaseModel {
  constructor() {
    super("board", BoardSchema);
  }

  //Liên kết board vs workspace
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

  //Liên kết 1 board vs task
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
          foreignField: "boardID",
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

module.exports = BoardModel;
