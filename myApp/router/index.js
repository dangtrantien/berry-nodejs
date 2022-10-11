const UserRouter=require('./UserRouter.js')
const router=(app)=>{
app.use('/users',UserRouter)
}
module.exports = router;
