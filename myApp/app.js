const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3002;
const Router = require("./router/index");
const WebSockets = require("./util/WebSockets");
const socketio = require("socket.io");

//database connection
const database = require("./DAL/database");
const mongodb = new database();

//set the express.static middleware
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

//Route init
Router(app);

// //integrating socket.io
// socket = io(http);
// //socket.io setup event listener
// socket.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("chat message", (msg) => {
//     console.log("message: " + msg);
//     //broadcast message to everyone in port:5000 except yourself.
//     socket.broadcast.emit("received", { content: msg });
//   });

//   //Someone is typing
//   socket.on("typing", (data) => {
//     socket.broadcast.emit("notifyTyping", {
//       user: data.user,
//       message: data.message,
//     });
//   });

//   //when soemone stops typing
//   socket.on("stopTyping", () => {
//     socket.broadcast.emit("notifyStopTyping");
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });

//   //save chat to the database
//   mongodb.connect().then((err, res) => {
//     if (err) throw err;
//     console.log("Successfully connect to mongoDB");

//     let chatMessage = new Comment({ content: msg, sender: "Anonymous" });
//     chatMessage.save();
//   });
// });

// http.listen(PORT, async () => {
//   console.log(`Server listening on port ${PORT}`);
// });

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  //Connect to mongoDB
  mongodb.connect().then((err, res) => {
    if (err) throw err;
    console.log("Successfully connect to mongoDB");
  });
});

/** Create socket connection */
global.io = socketio(server);
global.io.on("connection", WebSockets.connection);
