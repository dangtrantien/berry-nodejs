const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        // required: true,
    },
    address: {
        type:String,
        // required:true
    },
    avatar: {
        type: String, // URL only
        default: "",
    }
});
UserSchema.path("_id").ref("User");


module.exports = mongoose.model("User", UserSchema);
