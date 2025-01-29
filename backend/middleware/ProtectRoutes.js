import jwt from 'jsonwebtoken';

import { ENV_VARS } from '../Config/envVars.js';
import { User } from '../Models/user.js';
export const protectRoute = async (req, res, next) => {
    try{
    const token = req.cookies["jwt-netflix"]
     if(!token){
        return res.status(401).json({success:false, message: "unauthorized  - no token provided"})
     }
     const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    
    if(!decoded){
        return res.status(401).json({success:false, message: "unauthorized  - token verification failed"})
    }
    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
        return res.status(404).json({success:false, message: "user not found"})
    }
    req.user = user;
    next();
}
     catch (error) {
        console.log("error in protectRoute middleware", error.message);
        res.status(500).json({ success: false, message: "internal server error" });
    }
};
