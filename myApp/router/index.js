const cors = require("cors");
const UserRouter = require('./UserRouter.js')
const WorkSpaceRouter = require('./WorkSpaceRouter.js')
const KanbanBoadRouter = require('./KanbanBoadRouter.js')
const TicketRouter = require('./TicketRouter.js')

const router = (app) => {
app.get("/", (req, res, next) => {
    res.send("This is homepage");
    next();
  });
    app.use('/api/users', UserRouter)
    app.use('/api/workSpaces', WorkSpaceRouter)
    app.use('/api/kanbanBoards', KanbanBoadRouter)
    app.use('api/tickets', TicketRouter)

}

module.exports = router;
