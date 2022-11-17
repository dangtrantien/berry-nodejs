const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3002;
const Router = require("./router/index");
const { WebSockets } = require("./util/WebSockets");

//database connection
const database = require("./DAL/database");
const mongodb = new database();

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

//Route init
Router(app);

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  //Connect to mongoDB
  mongodb.connect().then((err, res) => {
    if (err) throw err;
    console.log("Successfully connect to mongoDB");
  });
});

//Create socket connection
WebSockets(server);
