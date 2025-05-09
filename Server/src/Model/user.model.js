const mongoose = require('mongoose');
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
});
const UserModel = mongoose.model("todo_users",userSchema);
module.exports = UserModel;