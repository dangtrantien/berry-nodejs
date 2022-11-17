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

    socket.on("update_task", (id, task) => {
      io.in(id).emit("update_task", task);
    });

    socket.on("delete_task", (id) => {
      io.in(id).emit("delete_task");
    });

    socket.on("new_comment", (comment) => {
      io.emit("new_comment", comment);
    });

    socket.on("update_comment", (id, comment) => {
      io.in(id).emit("update_comment", comment);
    });

    socket.on("delete_comment", (id) => {
      io.in(id).emit("delete_comment");
    });
  });
};

module.exports = { WebSockets };
