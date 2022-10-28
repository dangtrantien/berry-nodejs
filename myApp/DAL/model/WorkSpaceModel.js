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
}

module.exports = WorkSpaceModel;
