const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'todo_user',
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['Pending', 'Completed'],
        default:'Pending',
        required:true
    },
    duedate:{
        type:Date,
        required:true,
    }
});
const TodoModel = mongoose.model("todo_task",todoSchema);
module.exports = TodoModel;