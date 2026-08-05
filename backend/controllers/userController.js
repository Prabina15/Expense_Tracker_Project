import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
//Register a user

const JWT_SECRET = "secret";
const TOKEN_EXPIRES='24h';

const createToken = (userId)=>
    jwt.sign({userId}, JWT_SECRET, {expiresIn: TOKEN_EXPIRES});

export async function registerUser(req, res) {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        });
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email"
        });
    }
    if(password.length < 6){
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters"
        });
    }
    try {
    if(await userModel.findOne({email})){
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await userModel.create({name, email, password: hashed});
    const token = createToken(user.id);
    res.status(201).json({
        success: true,
        token,
        user:{id:user._id, name:user.name, email:user.email}
    })
    
} catch (error) {
    res.status(500).json({
        success: false,
        message: "Internal server error"
    })
}
}


//to login a user

export async function loginUser(req, res){
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        });
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const token = createToken(user.id);
        res.status(200).json({
            success: true,
            token,
            user:{id:user._id, name:user.name, email:user.email}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// to get login user details

export async function getCurrentUser(req,res) {
    try {
        const user = await userModel.findById(req.user.id).select("name email");
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// Update a user profile

export async function updateProfile(req, res) {
    const{name, email}= req.body;
    if(!name || !email){
        return res.status(400).json({
            success: false,
            message: "Valid emails and names are required"
        });
    }
    try {
        const exists= await userModel.findOne({email, _id: {$ne:req.user.id}});
        if(exists){
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const user = await userModel.findByIdAndUpdate(
            req.user.id,
            {name, email},
            {new:true, runValidators:true, select:"name email"}
        );
        res.json({
            success: true,
            user
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// to change user password

export async function updatePassword(req, res) {
    const {currentPassword, newPassword} = req.body;
    if(!currentPassword || !newPassword || newPassword.length < 6){
        return res.status(400).json({
            success: false,
            message: "Password Invalids"
        });
    }
    try {
        const user = await userModel.findById(req.user.id).select("password");
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({
            success: true,
            message: "Password updated successfully"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export default { registerUser, loginUser, getCurrentUser, updateProfile, updatePassword}