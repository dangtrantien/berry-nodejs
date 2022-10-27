const TaskSchema = require("../schema/TaskSchema");
const BaseModel = require("./baseModel");

class TaskModel extends BaseModel {
  constructor() {
    super("task", TaskSchema);
  }

  //Liên kết task vs comment
  commentAggregate = async function () {
    const agg = [
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "taskID",
          as: "comments",
        },
      },
    ];

    const result = await this.model.aggregate(agg);

    return result;
  };
}

module.exports = TaskModel;
