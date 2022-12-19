const UploadSchema = require("../schema/UploadSchema");
const BaseModel = require("./baseModel");

class UploadModel extends BaseModel {
  constructor() {
    super("upload", UploadSchema);
  }

  //Liên kết upload vs task
  taskAggregate = async function () {
    const agg = [
      {
        $lookup: {
          from: "tasks",
          localField: "taskID",
          foreignField: "_id",
          as: "taskID",
        },
      },
      { $unwind: "$taskID" },
      { $sort: { createdAt: -1 } },
    ];

    const result = await this.model.aggregate(agg);

    return result;
  };
}

module.exports = UploadModel;
