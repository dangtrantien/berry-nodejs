const socketio = require("socket.io");
const CommentController = require("../controller/CommentController");

const commentController = new CommentController();

const WebSockets = function (server) {
  const io = socketio(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("new-task", (msg) => {
      // global.io.sockets
      //   .in(comment.taskID)
      //   .emit("new comment", { message: post });
      io.emit("task", { message: msg });
    });

    socket.on("new-comment", async (msg) => {
      // global.io.sockets
      //   .in(comment.taskID)
      //   .emit("new comment", { message: post });
      commentController.addComment.then((data) => {
        console.log(data);
      });
      io.emit("comment", { message: msg });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    // //save chat to the database
    // mongodb.connect().then((err, res) => {
    //   if (err) throw err;
    //   console.log("Successfully connect to mongoDB");

    //   let chatMessage = new Comment({ content: msg, sender: "Anonymous" });
    //   chatMessage.save();
  });
};

module.exports = { WebSockets };
