import jwt from "jsonwebtoken";
export const generateToken =(userId,res)=>{
    
    const token =jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
    res.cookie("jwt",token,{
        maxAge : 7*24*60*60*1000 ,//as they want in ms,
        httpOnly:true,
        sameSite:"lax",
        secure:false
    });
    return token

    //the userId is generated in mongoDb

}
// ig this is the place where we are generating a cookie 
//this is the place
//will explain the codee  line by line

