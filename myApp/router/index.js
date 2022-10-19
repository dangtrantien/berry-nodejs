const UserRouter = require('./UserRouter.js')
const WorkSpaceRouter = require('./WorkSpaceRouter.js')
const KanbanBoadRouter = require('./KanbanBoadRouter.js')
const router = (app) => {
    app.use('/api/users', UserRouter)
    app.use('/api/workSpaces', WorkSpaceRouter)
    app.use('/api/kanbanBoards', KanbanBoadRouter)

}
module.exports = router;
