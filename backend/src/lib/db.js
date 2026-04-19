import mongoose from "mongoose";
export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDb is connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("problem in connecting with Mongodb",error);
        
    }
};