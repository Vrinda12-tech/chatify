import User from "../models/user.model.js"
import Message from "../models/message.model.js";
export  const getUsersForSidebar= async (req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}})
        res.status.json(filteredUsers)
        
    } catch (error) {
        console.error("Error in getting user from the database",error.message);
        res.status(500).json({error:"Internal server error"})
        
    }



}
// in messages we want only two things we want our users to see them second we want the message from the users itself
// in message we want to see our history in the order like the first message to the last message
// in this way we want the message
export const getMessages = async (req,res)=>{
    try {
        const {id:userToChat}=req.params;
        const senderId = req.user._id;
        const messages = await Message.find({
            $or:[{
                senderId:senderId,receiverId:userToChat
            },
            {senderId:userToChat,userId:senderId}
        ]

        })
        res.status(200).json(messages)

        
    } 
    catch (error) {
        console.error("Error in getting user from the database",error.message);
        res.status(500).json({error:"Internal server error"})
    }
}
export const sendMessage = async (req,res)=>{
    try {
        const {text,image} = req.body;
        const {id:receiverId} =req.params;
        const senderId = req.user._id
        let imageUrl;
        if (image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl =  uploadResponse.secure_url;
        }
        const newMessage = newMessage({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })
        await newMessage.save();
        res.status(201).json(newMessage)


        
    } catch (error) {
        console.error("Error in getting user from the database",error.message);
        res.status(500).json({error:"Internal server error"})
        
    }

}
        
    


