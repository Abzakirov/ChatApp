import axios from "axios";

export const axiosIntance=axios.create({
    baseURL:"https://chat-app-bb-tai4.onrender.com/api",
    withCredentials:true
})