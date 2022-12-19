const UserRouter = require("./UserRouter.js");
const WorkSpaceRouter = require("./WorkSpaceRouter.js");
const BoardRouter = require("./BoardRouter.js");
const TaskRouter = require("./TaskRouter.js");
const CommentRouter = require("./CommentRouter");
const UploadRouter = require("./UploadRouter.js");

const router = (app) => {
  app.get("/", (req, res) => {
    res.send("This is homepage");
  });
  app.use("/api/users", UserRouter);
  app.use("/api/workSpaces", WorkSpaceRouter);
  app.use("/api/boards", BoardRouter);
  app.use("/api/tasks", TaskRouter);
  app.use("/api/comments", CommentRouter);
  app.use("/api/uploads", UploadRouter);
};

module.exports = router;
