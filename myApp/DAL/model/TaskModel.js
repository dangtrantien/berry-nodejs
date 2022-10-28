const TaskSchema = require("../schema/TaskSchema");
const BaseModel = require("./baseModel");

class TaskModel extends BaseModel {
  constructor() {
    super("task", TaskSchema);
  }

  //Liên kết task vs ticket
  ticketAggregate = async function () {
    const agg = [
      {
        $lookup: {
          from: "tickets",
          localField: "ticketID",
          foreignField: "_id",
          as: "ticketID",
        },
      },
      { $unwind: "$ticketID" },
    ];

    const result = await this.model.aggregate(agg);

    return result;
  };
}

module.exports = TaskModel;
