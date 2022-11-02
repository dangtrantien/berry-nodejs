const TaskSchema = require("../schema/TaskSchema");
const BaseModel = require("./baseModel");

class TaskModel extends BaseModel {
  constructor() {
    super("task", TaskSchema);
  }

  //Liên kết task vs board
  boardAggregate = async function () {
    const agg = [
      {
        $lookup: {
          from: "boards",
          localField: "boardID",
          foreignField: "_id",
          as: "boardID",
        },
      },
      { $unwind: "$boardID" },
    ];

    const result = await this.model.aggregate(agg);

    return result;
  };
}

module.exports = TaskModel;
