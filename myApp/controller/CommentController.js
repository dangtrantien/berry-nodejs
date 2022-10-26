const UserModel = require("../DAL/model/UserModel");
const TicketModel = require("../DAL/model/TicketModel");
const CommentModel = require("../DAL/model/CommentModel");

const userModel = new UserModel();
const ticketModel = new TicketModel();
const commentModel = new CommentModel();

class CommentController {
  addComment = async (req, res) => {
    try {
      const { ticketID } = req.params;
      const message = req.body.message;
      const senderID = req.body.senderID;

      const post = await commentModel.addCommentInTicket(
        ticketID,
        message,
        senderID
      );

      global.io.sockets.in(ticketID).emit("new message", { message: post });

      return res.status(200).json({ success: true, post });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  };

  getConversationByTicketID = async (req, res) => {
    try {
      const { ticketID } = req.params;
      const ticket = await ticketModel.findById(ticketID);
      if (!ticket) {
        return res.status(400).json({
          success: false,
          message: "No ticket exists for this id",
        });
      }

      const users = await userModel.findById(ticket[0].userID);
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      };

      const conversation = await commentModel.getConversationByTicketId(
        ticketID,
        options
      );

      return res.status(200).json({
        success: true,
        conversation,
        users,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  };

  markConversationReadByTicketID = async (req, res) => {
    try {
      const { ticketID } = req.params;
      const ticket = await ticketModel.findById(ticketID);
      if (!ticket) {
        return res.status(400).json({
          success: false,
          message: "No ticket exists for this id",
        });
      }

      const currentLoggedUser = req.userId;
      const result = await commentModel.markMessageRead(
        ticketID,
        currentLoggedUser
      );

      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  };

  deleteCommentById = async (req, res) => {
    const id = req.query.id;
    const result = await commentModel.delete(id);

    if (result) res.json("Succesfully delete");
    else res.json("Sorry, something went wrong");
  };
}

module.exports = CommentController;
