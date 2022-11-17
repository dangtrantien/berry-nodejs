const { Server } = require("socket.io");

const WebSockets = function (server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("new_task", (task) => {
      io.emit("new_task", task);
    });

    socket.on("update_task", (task) => {
      io.emit("update_task", task);
    });

    socket.on("delete_task", (task) => {
      io.emit("delete_task", task);
    });

    socket.on("new_comment", (comment) => {
      io.emit("new_comment", comment);
    });

    socket.on("update_comment", (comment) => {
      io.emit("update_comment", comment);
    });

    socket.on("delete_comment", (comment) => {
      io.emit("delete_comment", comment);
    });
  });
};

module.exports = { WebSockets };
