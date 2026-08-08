import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export default async function authMiddleware(req, res, next){
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("FATAL ERROR: JWT_SECRET is not defined in the environment variables.");
        return res.status(500).json({
            success: false,
            message: "Internal server configuration error"
        });
    }

    //grab the token
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success: false,
            message: "Not authorized or token missing"});
    }

    const token = authHeader.split(" ")[1]; // Remove "Bearer " from the beginning

    try {
        const payload = jwt.verify(token, jwtSecret);
        const user = await User.findById(payload.userId).select("-password");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Not authorized or user not found"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("JWT verification failed:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
}

