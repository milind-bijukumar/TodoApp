const TodoModel = require('../Model/todo.model');
const getTask = async (req, res) => {
    try{
    const userId = req.userDetails._id;
    const tasks = await TodoModel.find({ user: userId });
    return res.status(200).send({ success: true, tasks });

    }catch(err){
        return res.status(500).send({message:"Internal Server Error",error:err})
    }
  };
  //To create a new task for the user
  const createTask = async (req, res) => {
    const{title,description,status, dueDate}= req.body;
    if(!title || !description || !status||!dueDate){
       return res.status(400).send({success:false, message:"Missing Fields"});
    }
    try{
      const newTask= new TodoModel({user:req.userDetails._id,title,description,status, duedate:dueDate});
      await newTask.save();
      return res.status(201).send({success:true, message:"Task added Successfully"});
    }catch(err){
      return res.status(500).send({message:"Internal Server Error",error:err})
    }
  };
  //To delete a  task for the user
  const deleteTask = async (req, res) => {
    try{
      const taskId = req.params.id;
      const deleted = await TodoModel.findByIdAndDelete(taskId);
      if (!deleted) {
        return res.status(404).send({ message: "Task not found" });
      }
      return res.status(200).send({ success: true,message: "Task deleted successfully" });
    }catch(err){
      return res.status(500).send({message:"Internal Server Error",error:err})
    }
  };
  //to mark task as completed
  const completeTask = async (req, res) => {
    try{
      const taskId = req.params.id;
      const updated = await TodoModel.findByIdAndUpdate(
        taskId,
        { status: "Completed" },
        { new: true }
      );
      return res.status(200).send({success: true, message: "Task Completed successfully", task: updated });
    }catch(err){
      return res.status(500).send({message:"Internal Server Error",error:err})
    }
  };
  //to update task  
  const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;
    // Validate required fields
    if (!title || !description || !status || !dueDate) {
      return res.status(400).send({ success: false, message: "Missing fields" });
    }
    try {
      const updatedTask = await TodoModel.findByIdAndUpdate(id,
        { title, description, status, duedate:dueDate },
        { new: true }
      );
      if (!updatedTask) {
        return res.status(404).send({ success: false, message: "Task not found" });
      }
      return res.status(200).send({ success: true, task: updatedTask, message:"Task Updated Successfully!"});
    }catch(err){
      return res.status(500).send({message:"Internal Server Error",error:err})
    }
  };
  module.exports = {getTask,createTask,deleteTask,completeTask,updateTask}