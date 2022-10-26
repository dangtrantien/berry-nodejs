const TicketSchema = require("../schema/TicketSchema");
const BaseModel = require("./baseModel");

class TicketModel extends BaseModel {
  constructor() {
    super("ticket", TicketSchema);
  }

  //Liên kết ticket vs comment
  commentAggregate = async function () {
    const agg = [
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "ticketID",
          as: "comments",
        },
      },
    ];

    const result = await this.model.aggregate(agg);

    return result;
  };
}

module.exports = TicketModel;
