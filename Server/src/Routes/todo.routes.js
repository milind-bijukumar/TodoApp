const { getTask, createTask, deleteTask, completeTask, updateTask } = require("../Controllers/todo.controllers");
const { verifyJWT } = require("../Middlewares/auth.middleware");
module.exports = (app)=>{
    //API call to fetch Task
    app.get('/',[verifyJWT],getTask);
    //API to create task
    app.post('/',[verifyJWT],createTask);
    //API to delete task
    app.delete('/tasks/:id', [verifyJWT], deleteTask);
    //API to mark task as completed 
    app.patch('/task/:id', [verifyJWT],completeTask);
    //API to update Task
    app.put('/task/:id', [verifyJWT],updateTask);

}