import axios from "axios"; 

const api = axios.create({
  baseURL : '/api',
  headers: {
   // Authorization: `Bearer ${localStorage.getItem("token")}`,
    token: localStorage.getItem("token"),
    //"Content-Type": "application/json",
    timeout : 1000,
  }, 
});

export default api;