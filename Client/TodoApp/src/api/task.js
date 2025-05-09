import { axiosInstance } from "./axiosInstance";

export const addTask = async (data)=>{
    console.log("Make an API call with data",data);
    const token = localStorage.getItem("token");

    try {
      const response = await axiosInstance.post("http://localhost:8082/", data, {
        headers: {
          "access-token": token,
        },
      });
      return response.data;
    } catch (err) {
      return err.response.data;
    }
}
export const getAllTasks = async ()=>{
    console.log("Make an API call with data");
    const token = localStorage.getItem("token");

    try {
      const response = await axiosInstance.get("http://localhost:8082/", {
        headers: {
          "access-token": token,
        },
      });
      return response.data;
    } catch (err) {
      return err.response.data;
    }
}

export const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.delete(`http://localhost:8082/tasks/${id}`, {
        headers: {
          "access-token": token,
        },
      });
      return response.data;
    } catch (err) {
      return err.response?.data || { message: "Something went wrong" };
    }
};

export const completeTask = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.patch(
      `http://localhost:8082/task/${id}`,
      { status: "Completed" },
      {
        headers: {
          "access-token": token,
        },
      }
    );
    return response.data;
    } catch (err) {
      return err.response?.data || { message: "Something went wrong" };
    }
};
export const updateTask = async (id, taskData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axiosInstance.put(`http://localhost:8082/task/${id}`, taskData, {
            headers: {
                "access-token": token,
            },
        });
        return response.data;
    } catch (err) {
        return err.response?.data || { message: "Something went wrong" };
    }
};