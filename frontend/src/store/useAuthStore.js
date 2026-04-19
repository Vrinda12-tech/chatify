import {create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
export const useAuthStore = create ((set)=>({
    authUser:null,

    isCheckingAuth : true,
    isLoggingIn:false,
    isSigningUp:false,
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
    }



}));
//checkAuth is a async fn and let me help me understanding u that
//so let me help understanding thisssssssssssssss basically jwt token server use check karegya yeah bana hain ya nhi that's it 
//Axios instance as dev pov helps in server ke saath connect karke aise puchega 

