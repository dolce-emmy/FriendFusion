import axios from "axios"; 

const api = axios.create({
  baseURL : '/api',
  headers: {
//  Authorization: `<Your Auth Token>`,
    "Content-Type": "application/json",
    timeout : 1000,
  }, 
});

export default api;