import { useState } from "react";
import {Link,useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/auth";
import toast from "react-hot-toast";
const Login = () =>{
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
      });
    //Function to handle input field value change
    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
          ...prevUser,
          [id]: value
        }));
    };
    //function that handles form submission
    const onLogin = async (e) =>{
        e.preventDefault();
        //Passing the user values to API
        const response = await LoginUser(user);
        if (response.success) {
            toast.success(response.message || "Login successfull!");
            setUser({email: '', password: '' });
            const accessToken = response.accessToken;
            localStorage.setItem("token",accessToken);
            navigate("/");
          } else {
            toast.error("Login failed.");
          }
    };
    return(
        <div className="h-[94vh] flex flex-col items-center justify-center gap-4">
            <div>
                <h1 className="text-5xl">Login to Todo App</h1>
            </div> 
            <div className="w-[400px] h-[300px] ">
                <form onSubmit={onLogin}>
                <div className="m-4">
                    <label htmlFor="email" className="block text-lg text-left mb-2">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="border border-gray-300 text-gray-900 rounded-lg w-full p-2.5" 
                        placeholder="Enter your email"
                        value={user.email}
                        onChange={handleChange} 
                        required />
                </div>
                <div className="m-4">
                    <label htmlFor="password" className="block text-lg text-left mb-2">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="border border-gray-300 text-gray-900 rounded-lg w-full p-2.5" 
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={handleChange} 
                        required />
                </div>
                <p className="text-sm">New User? <span className="underline"><Link to='/register'>Register Here</Link></span></p>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 text-lg rounded-lg text-sm text-center w-[200px] h-[40px] mt-2">Login</button>
                </form>
            </div>        
        </div>
    );
}
export default Login;