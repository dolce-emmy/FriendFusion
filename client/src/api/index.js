import axios from "axios"; 

const api = axios.create({
  baseURL : 'http://localhost:4000',
  headers: {
   // Authorization: `Bearer ${localStorage.getItem("token")}`,
    token: localStorage.getItem("token"),
    //"Content-Type": "application/json",
    timeout : 1000,
  }, 
});

export default api;

//src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"