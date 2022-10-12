const UserRouter = require('./UserRouter.js')
const WorkSpaceRouter = require('./WorkSpaceRouter.js')
const KanbanBoadRouter = require('./KanbanBoadRouter.js')
const router = (app) => {
    app.use('/users', UserRouter)
    app.use('/workSpaces', WorkSpaceRouter)
    app.use('/kanbanBoards', KanbanBoadRouter)

}
module.exports = router;
