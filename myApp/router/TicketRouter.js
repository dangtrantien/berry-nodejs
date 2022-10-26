const express = require("express");
const TicketRouter = express.Router();
const TicketController = require("../controller/TicketController.js");

const ticketController = new TicketController();

TicketRouter
  .get("/", ticketController.getAllTickets)
  .get("/getTicketById", ticketController.getTicketById)
  .post("/createTicket", ticketController.createTicket)
  .put("/updateTicketById", ticketController.updateTicketById)
  .delete("/deleteTicketById", ticketController.deleteTicketById)
  .get(
    "/getAllCommentsOfAllTickets",
    ticketController.getAllCommentsOfAllTickets
  );

module.exports = TicketRouter;
