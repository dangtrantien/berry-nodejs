const { Server } = require("socket.io");

const WebSockets = function (server) {
  const io = new Server(server, {
    cors: {
      // origin: "https://x-career-06-team1-fe.as.r.appspot.com",
      // origin: "http://localhost:3000",
      origin: "http://localhost:4200",
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
      io.emit("user", data);
    });

    socket.on("workspace", (data) => {
      io.emit("workspace", data);
    });

    socket.on("board", (data) => {
      io.emit("board", data);
    });

    socket.on("task", (data) => {
      io.emit("task", data);
    });

    socket.on("comment", (data) => {
      io.emit("comment", data);
    });
  });
};

module.exports = { WebSockets };
