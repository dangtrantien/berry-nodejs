const { Server } = require("socket.io");
const cors = require("cors");

const WebSockets = function (server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      maxHttpBufferSize: 1e8,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    socket.on("user", (data) => {
      io.emit("edit_user", data);
    });

    socket.on("workspace", (data) => {
      io.emit("edit_workspace", data);
      if (data === "Succesfully delete") {
        io.emit("delete_workspace");
      }
    });

    socket.on("board", (data) => {
      io.emit("edit_board", data);
      if (data === "Succesfully delete") {
        io.emit("delete_board");
      }
    });

    socket.on("task", (data) => {
      io.emit("edit_task", data);
      if (data === "Succesfully delete") {
        io.emit("delete_task");
      }
    });

    socket.on("comment", (data) => {
      io.emit("receive_comment", data);
      io.emit("edit_comment", data);
      if (data === "Succesfully delete") {
        io.emit("delete_comment");
      }
    });
  });
};

module.exports = { WebSockets };
