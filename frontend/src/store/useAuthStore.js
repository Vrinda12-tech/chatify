import {create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


export const useAuthStore = create ((set)=>({
    authUser:null,

    isCheckingAuth : true,
    isLoggingIn:false,
    isSigningUp:false,
    //look this is the loading state 
    // at this point we will load the things
    isUpdatingProfile:false,
    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data});
            //its simple as that jaise hi dataa aageya we will make it public like everyone data is here

            
        } catch (error) {
            console.log("error in checkAuth",error);
            set({authUser:null})
            
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async(data)=>{
        set({isSigningUp:true})
        try {
            const res =await axiosInstance.post("auth/signup",data);
            set({authUser:res.data});
            toast.success("Account created Succesfully🔥🔥");
            // set({auth})

            
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
        finally{
            set({isSigningUp:false});
        }

    },
    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res =await axiosInstance.post("auth/login",data);
            set({authUser:res.data});
            toast.success("Login successfull🎉");
            // set({auth})

            
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
        finally{
            set({isLoggingIn:false});
        }
    },
    logout:async(data)=>{
        try {
            await axiosInstance.post("/auth/logout")
            
            toast.message("Logged out successfully")
            
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
    }
    




}));
//checkAuth is a async fn and let me help me understanding u that
//so let me help understanding thisssssssssssssss basically jwt token server use check karegya yeah bana hain ya nhi that's it 
//Axios instance as dev pov helps in server ke saath connect karke aise puchega 

