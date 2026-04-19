import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    "fullName":{
    type:String,
    required:true,


   },

    "email":{
        type:String,
        required:true,
        unique:true
    },
    "password":{
        type:String,
        minlength:6,
        required:true,
        
    },
    "profilePic":{
        type:String,
        default:"",

        
    },
    

    // userName:{
    //     type:String,
    //     required:true,
    //     unique:true

    // }
},{timestamps:true})
const User=mongoose.model("User",userSchema);
export default User;
//we have defined User that how the info user will be stored in mongoose