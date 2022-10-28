const { ticketUpdateValidate } = require("../middleware/Validate.js");
const TicketModel = require("../DAL/model/TicketModel");

const ticketModel = new TicketModel();

class TicketController {
  createTicket = async (req, res) => {
    const newTicket = req.body.newTicket;

    ticketModel
      .createNew(newTicket)
      .then((data) => res.send(data))
      .catch((err) => {
        throw err;
      });
  };

  getTicketById = (req, res) => {
    const id = req.query.id;

    ticketModel
      .findById(id)
      .then((data) => {
        if (data.length > 0) res.json(data);
        else res.json("Ticket dose not exist");
      })
      .catch((err) => {
        throw err;
      });
  };

  getAllTicketsOfAllWorkSpaces = async (req, res) => {
    const data = await ticketModel.workspaceAggregate();
    res.json({ length: data.length, data: data });
  };

  updateTicketById = async (req, res) => {
    const { value, error } = ticketUpdateValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.query.id;
    const result = await ticketModel.update(id, value);

    if (result) res.send({ success: true, message: "Succesfully updated" });
    else
      res.send({
        success: false,
        message: "Sorry, something went wrong",
      });
  };

  deleteTicketById = async (req, res) => {
    const id = req.query.id;
    const result = await ticketModel.delete(id);

    if (result) res.json("Succesfully delete");
    else res.json("Sorry, something went wrong");
  };
}

module.exports = TicketController;
