const mongoose = require("mongoose");
const TicketSchema = require("./TicketModel");
const Schema = mongoose.Schema;

const KanbanBoardSchema = new Schema({
     // _id: mongoose.ObjectId,
    user: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true,
    },
    workSpaceID:{
        type:mongoose.ObjectId,
        ref:"WorkSpace",
        required:true
    },
    name: {
        type: String,
        required: true,
    },
    tickets:{
        type:Array,
        value:TicketSchema
    }
    
});
KanbanBoardSchema.path("_id").ref("KanbanBoard")


module.exports = mongoose.model("KanbanBoard", KanbanBoardSchema);
