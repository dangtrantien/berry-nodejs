const express = require("express");
const path = require("path");
const app = express();
const port = 3002;
const Router = require("./router/index");

const database = require("./DAL/database");
const mongodb = new database();

app.use("static", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

//Route init
Router(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);

  //Connect to mongoDB
  mongodb.connect().then((err, res) => {
    if (err) throw err;
    console.log("Successfully connect to mongoDB");
  });
});
