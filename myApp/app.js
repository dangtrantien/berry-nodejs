const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3002;

const database = require("./DAL/database");
const mongodb = new database();

app.use("static", express.static(path.join(__dirname, "public")));

//Route init
app.get("/", (req, res, next) => {
  res.send("This is homepage");
  next();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);

  //Connect to mongoDB
  mongodb.connect().then((err, res) => {
    if (err) throw err;
    console.log("Successfully connect to mongoDB");
  });
});
