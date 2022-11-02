const UserRouter = require("./UserRouter.js");
const WorkSpaceRouter = require("./WorkSpaceRouter.js");
const BoardRouter = require("./BoardRouter.js");
const TaskRouter = require("./TaskRouter.js");
const CommentRouter = require("./CommentRouter");

const router = (app) => {
  app.get("/", (req, res, next) => {
    res.send("This is homepage");
    next();
  });
  app.use("/api/users", UserRouter);
  app.use("/api/workSpaces", WorkSpaceRouter);
  app.use("/api/boards", BoardRouter);
  app.use("/api/tasks", TaskRouter);
  app.use("/api/comments", CommentRouter);
};

module.exports = router;
