const WorkSpaceSchema = require("../schema/WorkSpaceSchema");
const BaseModel = require("./baseModel");

class WorkSpaceModel extends BaseModel {
  constructor() {
    super("workspace", WorkSpaceSchema);
  }

  //Liên kết workspace vs ticket
  ticketAggregate = async function () {
    const agg = [
      {
        $lookup: {
          from: "tickets",
          localField: "_id",
          foreignField: "workSpaceID",
          as: "tickets",
        },
      },
    ];

    const result = await this.model.aggregate(agg);

    return result;
  };
}

module.exports = WorkSpaceModel;
