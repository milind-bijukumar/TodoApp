import Navbar from "../../components/navbar";
import deleteIcon from "../../assets/img/trash-solid.svg"
import completedIcon from "../../assets/img/circle-check-regular.svg"
import editIcon from "../../assets/img/pencil-solid.svg"
import { useEffect, useState,useRef } from "react";
import {useNavigate } from "react-router-dom";
import { addTask, completeTask, deleteTask, getAllTasks, updateTask } from "../../api/task";
import toast from "react-hot-toast";

const Home = () =>{
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [isUpdate, setIsUpdate]= useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [filter,setFilter]= useState("All");
    const [tasksArr,setTasksArr]= useState(null);
    const [filteredTask,setFilteredTask]=useState(tasksArr);
    const [task, setTask]= useState({
        title: '',
        description: '',
        status:'Pending',
        dueDate:''
    });

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
         
        const fetchTask = async()=>{
            const alltask= await getAllTasks();
            // console.log(alltask.tasks)
            setTasksArr(alltask.tasks)
        };
        fetchTask();
    },[])

    useEffect(()=>{
        setFilteredTask(tasksArr)
    },[tasksArr]);

    useEffect(()=>{
        if (filter === "All") {
            setFilteredTask(tasksArr);
        } else {
            setFilteredTask(tasksArr?.filter((task) => task.status === filter));
        }
    },[filter])

    //Filter Handler
    const filterHandler = (e) =>{
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);
    }
    //Function to handle input field value change
    const handleChange = (e) => {
        const { id, value } = e.target;
        setTask((prevTask) => ({
          ...prevTask,
          [id]: value
        }));
    };
    const addTaskHandler=async (e)=>{
        e.preventDefault();
        const response = await addTask(task);
        if (response.success) {
            toast.success(response.message);
            // Fetch updated tasks and refresh the list
            const updated = await getAllTasks();
            setTasksArr(updated.tasks);
            setTask({
                title: '',
                description: '',
                status: 'Pending',
                dueDate: ''
            });
        } else {
            toast.error(response.message || "Failed to add task");
        }
    }
    const handleDelete = async (id) => {
        const res = await deleteTask(id);
        if(res.success){
            toast.error(res.message);
        }
        // Refresh the task list after deletion
        const updated = await getAllTasks();
        setTasksArr(updated.tasks);
    };
    const handleMarkCompleted = async(id) =>{
        const res = await completeTask(id);
        if (res.success) {
            toast.success(res.message);
            const updated = await getAllTasks();
            setTasksArr(updated.tasks);
        } else {
            toast.error(res.message);
        }
    }
    const handleEdit = (id) => {
        const selectedTask = tasksArr.find(task => task._id === id);
        setIsUpdate(true);
        setSelectedTaskId(id);
        if (selectedTask) {
            setTask({
                title: selectedTask.title,
                description: selectedTask.description,
                dueDate: selectedTask.duedate?.slice(0, 10),
                status: selectedTask.status
            });
        }
        // Scroll to form
        formRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const UpdateHandler =async(e)=>{
        e.preventDefault();
        if (!selectedTaskId) return;

        const response = await updateTask(selectedTaskId, task); 
        if (response.success) {
            toast.success(response.message);
            const updated = await getAllTasks();
            setTasksArr(updated.tasks);
            setIsUpdate(false);
            setTask({ title: '', description: '', status: 'Pending', dueDate: '' });
            setSelectedTaskId(null);
        } else {
            toast.error(response.message);
        }
    }
    return(
        <>
        <Navbar/>
        <header>
            <h1 className="text-4xl my-8" >Todo Application</h1>
        </header>
        <main>
            <section className="m-4" id="addOrUpdate" ref={formRef}>
                <form 
                    action="" 
                    className="flex flex-row justify-evenly flex-wrap py-10"
                    onSubmit={isUpdate ? UpdateHandler : addTaskHandler}>
                    <div>
                        <label htmlFor="title" className="text-lg mb-2">Title</label> <br />
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            className="border border-gray-300 text-gray-900 p-2.5 w-full" 
                            placeholder="Enter Title" 
                            value={task.title}
                            onChange={handleChange} 
                            required/>
                    </div>
                    <div>
                        <label htmlFor="description" className="text-lg mb-2">Description</label><br />
                        <textarea 
                            id="description" 
                            name="description" 
                            rows="1" cols="40" 
                            className="border border-gray-300 text-gray-900 p-2.5 w-full" 
                            placeholder="Enter description" 
                            value={task.description}
                            onChange={handleChange} 
                            required/>
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="text-lg mb-2">Due Date</label><br />
                        <input 
                            type="date" 
                            id="dueDate" 
                            name="dueDate" 
                            className="border border-gray-300 text-gray-900 w-full p-2.5" 
                            value={task.dueDate}
                            onChange={handleChange} 
                            required/>
                    </div>
                    <div>
                        {isUpdate && (
                            <>
                             <label htmlFor="status" className="text-lg mb-2">Status : </label><br />
                            <select 
                                name="status" 
                                id="status" 
                                className="border border-gray-300 text-gray-900 w-full p-2.5" 
                                value={task.status}
                                onChange={handleChange}>
                            <option value="Pending"  >Pending</option>
                            <option value="Completed">Completed</option>
                            </select>
                            </>
                        )}
                    </div>
                    <div className="my-8">
                        {isUpdate || (
                                <>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 text-lg rounded-lg text-center w-[4rem] h-[2rem]">Add</button>
                                </>
                            )}
                        {isUpdate && (
                                <>
                                <button 
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 text-lg rounded-lg text-center w-[5rem] h-[2rem]"
                                    >Update
                                </button>
                                <button 
                                    className="text-white bg-red-700 hover:bg-red-800 text-lg rounded-lg text-center w-[2rem] h-[2rem] mx-2"
                                    onClick={()=>{
                                        setIsUpdate(false);
                                        setTask({title: '',description: '',status:'',dueDate:''});
                                    }}
                                    >X</button>
                                </>
                            )}                            
                        
                    </div>
                </form>
            </section>
            <section className="">
                <div>
                <label htmlFor="filter">Status : </label>
                <select name="filter" id="filter" onChange={filterHandler}>
                <option value="All" >All</option>
                <option value="Pending" >Pending</option>
                <option value="Completed" >Completed</option>
                </select>
                </div>
                {   filteredTask && (
                    <>
                    <table className="table-auto w-10/12 mx-auto border-separate border-spacing-y-8">
                        <thead>
                        <tr>
                            
                            <th>Title</th>
                            <th className="w-[20rem]">Description</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                filteredTask.map((task)=>{
                                    return (
                                        <tr key={task._id}>
                                            
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>{task.status}</td>
                                            <td>{task.duedate.slice(0,10)}</td>
                                            <td>{isUpdate || (
                                                <>
                                                <button onClick={() => handleDelete(task._id)}>
                                                <img className="w-[20px] h-[20px] mx-4" src={deleteIcon} alt="delete-icon"/>
                                                </button>
                                                </>)}     
                                            </td>
                                            <td>
                                            { task.status!=="Completed" && !isUpdate &&(
                                                <>
                                                <button onClick={() => handleMarkCompleted(task._id)}>
                                                    <img className="w-[25px] h-[25px] mx-4" src={completedIcon} alt="completed-icon"/>
                                                </button>
                                                </>
                                                )
                                            }
                                            </td>
                                            <td>{isUpdate || (
                                                <>
                                                <button onClick={() => handleEdit(task._id)}>
                                                    <img src={editIcon} alt="edit-icon" className="w-[20px] h-[20px]"/>
                                                </button>
                                                </>
                                                )} 
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    </>
                )
                }
            </section>
        </main>
        
        </>
    );
}
export default Home;