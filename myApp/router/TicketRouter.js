const express = require("express");
const TicketRouter = express.Router();
const TicketController = require("../controller/TicketController.js");

const ticketController = new TicketController();

TicketRouter
  .get("/getTicketById", ticketController.getTicketById)
  .post("/createTicket", ticketController.createTicket)
  .put("/updateTicketById", ticketController.updateTicketById)
  .delete("/deleteTicketById", ticketController.deleteTicketById)
  .get(
    "/getAllTicketsOfAllWorkSpaces",
    ticketController.getAllTicketsOfAllWorkSpaces
  );

module.exports = TicketRouter;
