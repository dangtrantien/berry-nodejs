const TicketSchema = require("../schema/TicketSchema");
const BaseModel = require("./baseModel");

class TicketModel extends BaseModel {
  constructor() {
    super("ticket", TicketSchema);
  }
}

module.exports = TicketModel;
