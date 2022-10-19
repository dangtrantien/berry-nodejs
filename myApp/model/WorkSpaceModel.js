const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkSpaceSchema = new Schema({
     // _id: mongoose.ObjectId,
    userID: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },

    
});
WorkSpaceSchema.path("_id").ref("WorkSpace")


module.exports = mongoose.model("WorkSpace", WorkSpaceSchema);
