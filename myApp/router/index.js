const cors = require("cors");
const UserRouter = require("./UserRouter.js");

const router = (app) => {
  app.get("/", (req, res, next) => {
    res.send("This is homepage");
    next();
  });
  app.use("/api/users", cors(), UserRouter);
};
module.exports = router;
