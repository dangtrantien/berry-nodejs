const obj = require("mongodb").ObjectId;
const { ticketUpdateValidate } = require("../middleware/Validate.js");
const TicketModel = require("../model/TicketModel.js");

class TicketController {
    createTicket = async (req, res) => {
        const newTicket = new TicketModel();
        newTicket.status = req.body.status;
        newTicket.member = req.body.member;
        newTicket.discribe = req.body.discribe;
        const ticket = await newTicket.save();
        res.send(ticket);
    }
    getAllTickets = (req, res) => {
        TicketModel.find().exec((err, tickets) => {
            if (err) {
                res.send("Khong the lay thong tin tickets");
            } else {
                // console.log("Lay thanh cong thong tin tat ca tickets");
                // console.log(tickets);
                res.json(tickets);
            }
        });
    };
    getTicketById = (req, res) => {
        TicketModel.find({ _id: req.query.id }).exec((err, ticket) => {
            if (err) {
                res.send("Khong the lay thong tin ticket");
            } else {
                // console.log("Lay thanh cong thong tin ticket");
                // console.log(ticket);
                res.json(ticket);
            }
        });
    };


    updateTicketById = (req, res) => {
        const { value, error } = ticketUpdateValidate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        TicketModel.findOneAndUpdate(
            { _id: req.query.id },
            value,
            { new: true },
            (err) => {
                if (err) {
                    res.send("Da xay ra loi khi update thong tin");
                } else {
                    res.send("Update thong tin thanh cong");
                }
            }
        );
    };
    deleteTicketById = (req, res) => {
        TicketModel.findOneAndDelete({ _id: req.query.id }, (err) => {
            if (err) {
                res.send("Da co loi xay ra khi delete ticket");
            } else {
                res.send("Xoa ticket thanh cong");
            }
        });
    };
   

}
module.exports = TicketController;