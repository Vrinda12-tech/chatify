import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
export const protectRoute = async (req , res ,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message:"Error in auth"})
        }
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Invalid Token"})
        }
        //after this if check we have to verify it
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(400).json({message:"No user detail found"})

        }
        req.user=user
        next()



        
    } catch (error) {
        console.log("Error in routes",error.message)
        res.status(500).json({message:"error"})
        
    }
}
// The Generator: Putting the Badge in the Pocket
// When a user logs in, the server creates the "badge" (JWT) and tells the browser to put it in a secure "pocket" (the cookie).
// Sign the Token: You use jwt.sign() to create a token containing the payload (usually the userId)
// .
// Set the Cookie: Use res.cookie() to send it to the browser
// .
// Security Lockdown: You must set httpOnly: true so hackers can't steal it with scripts (XSS protection) and sameSite: "strict" to stop unauthorized sites from using it (CSRF protection)
// .
// 2. The Middleware: The Nightclub Bouncer
// Once the cookie is stored, every time the user tries to do something (like send a message), the Protect Route middleware acts as a bouncer to check that cookie
// .
// Extraction: The server uses a library called cookie-parser to "read" the cookies coming in the request (req.cookies.jwt)
// .
// Verification: The server runs jwt.verify() using your Secret Key to make sure the badge isn't a fake
// .
// User Attachment: If the badge is real, the bouncer looks up the user in the database (using Mongoose) and attaches that user data to the request object (req.user = user) so your controllers know exactly who is talking
// .
// 3. The Requester: The "Check-In"
// For this to work on the frontend (React), you have to make sure your browser actually "shows" the cookie to the server.
// Credentials: In your Axios configuration, you must set withCredentials: true. Without this, the browser will "hide" the cookie, and the server will think the user is logged out
// .
// The Check-Auth Flow: When the app first loads, you run a Check Auth function in a useEffect hook. It sends a request to the server, the bouncer (middleware) verifies the cookie, and the server sends back the user info so your UI knows to show the "Welcome" screen instead of the "Login" screen
// .
// Should you put more resources?
// Based on the sources provided, you already have the complete implementation blueprint for a secure production-grade system
// .
// However, if you want to scale to a professional level, you could explore these specific "extra" topics:
// Refresh Tokens: The sources mention a "Gold Standard" hybrid approach where you use a short-lived Access Token in memory and a long-lived Refresh Token in a cookie
// .
// Zod or Express-Validator: For "hardening" your routes, these resources help ensure the data users send you isn't malicious
// .
// TypeScript Integration: Many modern MERN apps use TypeScript to prevent "dumb" coding errors before they happen
