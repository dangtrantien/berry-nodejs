const express = require("express");
const path = require("path");
const app = express();
const port = 3002; //localhost:3002
const PORT = process.env.PORT || 39293; //https://x-career-06-team1.herokuapp.com/
const Router = require("./router/index");

const database = require("./DAL/database");
const mongodb = new database();

app.use("static", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

//Route init
Router(app);

// //localhost:3002
// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);

//   //Connect to mongoDB
//   mongodb.connect().then((err, res) => {
//     if (err) throw err;
//     console.log("Successfully connect to mongoDB");
//   });
// });


//https://x-career-06-team1.herokuapp.com/
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);

  //Connect to mongoDB
  mongodb.connect().then((err, res) => {
    if (err) throw err;
    console.log("Successfully connect to mongoDB");
  });
});
