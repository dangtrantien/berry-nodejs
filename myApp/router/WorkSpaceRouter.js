const  express=require("express");
const WorkSpaceRouter=express.Router()
const WorkSpaceController=require("../controller/WorkSpaceController.js")

const workSpaceController= new WorkSpaceController();

WorkSpaceRouter.get("/", workSpaceController.getAllWorkSpaces);
WorkSpaceRouter.get("/:id", workSpaceController.getWorkSpaceById);
WorkSpaceRouter.post("/createWorkSpace", workSpaceController.createWorkSpace);

WorkSpaceRouter.put("/:id", workSpaceController.updateWorkSpaceById);
WorkSpaceRouter.delete("/:id", workSpaceController.deleteWorkSpaceById);

module.exports=WorkSpaceRouter 