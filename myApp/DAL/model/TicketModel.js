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
}

module.exports = TicketModel;
