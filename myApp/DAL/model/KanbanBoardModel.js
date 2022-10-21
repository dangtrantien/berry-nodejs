const KanbanBoardSchema = require("../schema/KanbanBoardSchema");
const BaseModel = require("./baseModel");

class KanbanBoardModel extends BaseModel {
  constructor() {
    super("kanbanboard", KanbanBoardSchema);
  }

  //Liên kết kanban board vs ticket
  ticketAggregate = async function () {
    const agg = [
      {
        $lookup: {
          from: "kanbanBoards",
          localField: "_id",
          foreignField: "kanbanBoardID",
          as: "tickets",
        },
      },
    ];

    const result = await this.model.aggregate(agg);

    return result;
  };
}

module.exports = KanbanBoardModel;
