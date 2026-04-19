// const express=require("express")
import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

dotenv.config()
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// Define Routing: You define how your application responds to client requests (like GET or POST) at specific endpoints using methods like app.get() or app.post()

// Use Middleware: It allows you to add functions that can process requests before they reach your route handlers, such as app.use(express.json()) to parse incoming JSON data

// Start the Server: You eventually tell this app instance to "listen" on a specific port (e.g., app.listen(5001)) so it can begin receiving traffic
app.use(express.json({limit:"5mb"})); 
app.use(express.urlencoded({extended:true}));
const PORT=process.env.PORT
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {origin : "http://localhost:5173",
        credentials:true
    }
))
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

// Global error handling for JSON parse errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({message:"Invalid JSON format. Please send valid JSON."})
    }
    next()
})

app.listen(PORT,()=>{
    console.log("server is running successfully on port "+PORT)
    connectDB()

})
// schemas"
// . These models ensure that any data saved to the database follows your specific rules and validation requirement