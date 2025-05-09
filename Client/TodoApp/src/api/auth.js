import { axiosInstance } from "./axiosInstance";
export const RegisterUser = async (data)=>{
    // console.log("Make an API call with data");
    try{
        const response = await axiosInstance.post("http://localhost:8082/register",data);
        return response.data;
    }catch(err){
        return err.response.data;
    }
}
export const LoginUser = async (data)=>{
    // console.log("Make an API call with data");
    try{
        const response = await axiosInstance.post("http://localhost:8082/login",data);
        return response.data;
    }catch(err){
        return err.response.data;
    }
}

