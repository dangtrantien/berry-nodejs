const cors = require("cors");
const UserRouter = require("./UserRouter.js");
const WorkSpaceRouter = require("./WorkSpaceRouter.js");
const KanbanBoadRouter = require("./KanbanBoadRouter.js");
const TicketRouter = require("./TicketRouter.js");

const router = (app) => {
  app.get("/", (req, res, next) => {
    res.send("This is homepage");
    next();
  });
  app.use("/api/users", cors(), UserRouter);
  app.use("/api/workSpaces", cors(), WorkSpaceRouter);
  app.use("/api/kanbanBoards", cors(), KanbanBoadRouter);
  app.use("api/tickets", cors(), TicketRouter);
};

module.exports = router;
