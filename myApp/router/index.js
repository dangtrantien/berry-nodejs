const UserRouter = require("./UserRouter.js");
const WorkSpaceRouter = require("./WorkSpaceRouter.js");
const TicketRouter = require("./TicketRouter.js");
const CommentRouter = require("./CommentRouter");

const router = (app) => {
  app.get("/", (req, res, next) => {
    res.send("This is homepage");
    next();
  });
  app.use("/api/comments", CommentRouter);
  app.use("/api/users", UserRouter);
  app.use("/api/workSpaces", WorkSpaceRouter);
  app.use("/api/tickets", TicketRouter);
};

module.exports = router;
