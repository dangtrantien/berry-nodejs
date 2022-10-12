const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KanbanBoardSchema = new Schema({
     // _id: mongoose.ObjectId,
    user: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true,
    },
    kanbanBoard: {
        type: mongoose.ObjectId,
        ref: "WorkSpace",
        required: true,
    },

    name: {
        type: String,
        required: true,
    },
    
});

module.exports = mongoose.model("KanbanBoard", KanbanBoardSchema);
