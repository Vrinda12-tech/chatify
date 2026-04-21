import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import  { generateToken }  from "../lib/utils.js"
import { v2 as cloudinary } from "cloudinary"

export const signup = async (req,res)=>{
    
    try {
        const { fullName, email, password } = req.body 
        
        
        // if(!fullName || !email || !password){
        //     return res.status(400).json({message:"you have to fill every detail"})
        // }

        if(password.length<6){
            return res.status(400).json({message:"Password length must be of 6 characters "})
        }
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message:"User email is registered"});
        //----hash the password----
        const salt =  await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            fullName,
            email,
           
            password:hashedPassword
        });
        if (newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,

                profilePic:newUser.profilePic,
                
            });
        }
        
    } catch (error) {
        console.log("Error in signup controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
        
    }
}
export const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        //so our first step is to check for a email
        //that a email like this exist or not
        ///ok?????
        const user = await User.findOne({email});
        if(!user){
        return res.status(404).json({message:"No user found"});
        }
        //we have hashed password in our dataset

         //if we passed this if check then we have to go further
        const isPassword = await bcrypt.compare(password,user.password)
        if(!isPassword){
            return res.status(400).json({message:"Password is incorrect "})

        }
        generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
            // password:user.password
        });
       

        
    } catch (error) {
        console.log("Error in signup controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }

}
export const logout = async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logout successfull🎉"})
    } catch (error) {
        console.log("Error in signup controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
        
        
    }

}
export const updateProfile =async (req,res) =>{
    // const {fullName,email,password,profilePic} = await req.body;
    try{
        const {profilePic} =req.body
        const userId =req.user._id
        if(!profilePic){
            return res.status(400).json({message:"please provide profile pic"})
        }
        console.log("📤 Uploading profile picture to Cloudinary...");
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            folder: "chatify/profiles",
            resource_type: "auto",
            max_file_size: 5242880 // 5MB limit
        });

        if (!uploadResponse || !uploadResponse.secure_url) {
            return res.status(400).json({
                success: false,
                message: "Failed to upload image. Response missing secure_url."
            });
        }

        console.log("✓ Image uploaded successfully:", uploadResponse.secure_url);
        
        const updatedUser = await User.findByIdAndUpdate(userId,{"profilePic":uploadResponse.secure_url},{new:true})
        res.status(200).json(updatedUser)


        //this fn is about pfp
    } catch (error) {
        console.error("❌ Error in updateProfile controller:", {
            message: error.message,
            code: error.http_code || "UNKNOWN",
            status: error.status || "UNKNOWN"
        });
        
        // Specific Cloudinary error handling
        if (error.message.includes("Resource not found")) {
            return res.status(400).json({
                success: false,
                message: "Invalid image URL or file type not supported",
                error: error.message
            });
        }
        
        if (error.http_code === 413) {
            return res.status(413).json({
                success: false,
                message: "File size exceeds 5MB limit"
            });
        }
        
        res.status(500).json({
            success: false,
            message: "Failed to upload profile picture",
            error: process.env.NODE_ENV === "development" ? error.message : "Internal Server Error"
        });
    }
}
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// wa1a6uhIP0aW119hoKy45maQUyQ
// api key -- 	
// 135114877598199