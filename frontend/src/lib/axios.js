import axios from "axios"
export const axiosInstance = axios.create({
    baseURL:"/api",
    withCredentials:true
})
// configured "courier" for your frontend to communicate with your backend server
// . Instead of giving full instructions for every single request, you define the rules once in this instance
// by using axios we are getting rid of traditional fetch api 
