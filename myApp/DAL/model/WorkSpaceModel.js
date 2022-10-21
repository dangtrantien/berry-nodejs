const WorkSpaceSchema = require("../schema/WorkSpaceSchema");
const BaseModel = require("./baseModel");

class WorkSpaceModel extends BaseModel {
  constructor() {
    super("workspace", WorkSpaceSchema);
  }

  //Liên kết workspace vs kanban board
  kanbanBoardAggregate = async function () {
    const agg = [
      {
        $lookup: {
          from: "kanbanboards",
          localField: "_id",
          foreignField: "workSpaceID",
          as: "workSpaces",
        },
      },
    ];

    const result = await this.model.aggregate(agg);

    return result;
  };
}

module.exports = WorkSpaceModel;
