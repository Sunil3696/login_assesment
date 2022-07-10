const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        required : true,
        type : String
    },
    status : {
        type : String, 
        enum : ['active', 'inactive'],
        default : 'inactive'
    }
}, {
    timestamps : true
})

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;