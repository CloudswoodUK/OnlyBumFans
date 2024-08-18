import { response } from "express";
//import axios from 'axios';
//import moment from 'moment';
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import mongoose from 'mongoose';
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const signup = async (req, res) => {
    const {email, password, name, gender, country, dateOfBirth} = req.body;
    try {
        if(!email || !password || !name || !gender || !country || !dateOfBirth) {
            throw new Error ("All fields are required.");
        }
        const age = calculateAge(dateOfBirth);
        if (age < 18) {
            return res.status(400).json({ success: false, message: "You need to be at least 18 years old to create account." });
        }
        const userAlreadyExists = await User.findOne({ email });
        console.log ("userAlreadyExists : ",userAlreadyExists);
        if(userAlreadyExists) {
            return res.status(400).json({success:false, message: "User already exists."});
        }       
        const hasPassword = await bcryptjs.hash(password, 12);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const userCount = await mongoose.models.User.countDocuments();
        const userSequenceNumberGenerated = (userCount + 1).toString();
        
        const user = new User ({
            userRegistrationId : Math.floor(Math.random() * 1e11).toString().padStart(11, '0'),
            userSequenceNumber : userSequenceNumberGenerated,
            email,
            password : hasPassword,
            name,
            gender,
            dateOfBirth,
            country,
            isOnline:true,
            verificationToken,
            verificationTokenExpiresAt : Date.now() + 24 * 60 * 60 * 1000 // 24 * 60 * 60 * 1000 => 24 hrs
        });
        await user.save();
        generateTokenAndSetCookie(res, user._id);
        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success : true,
            message : "You have successfully signed.",
            user : {
                ...user._doc,
                password : undefined,
            },

        });
    } catch (error) {
        return res.status(400).json({success:false, message: error.message});
    }
};

export const verifyEmail = async (req, res) => {
    const { code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken : code,
            verificationTokenExpiresAt : {$gt : Date.now()}
        })
        if(!user){
            return res.status(400).json({success:false, message : "Invalid or expired verification code."});
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email , user.name);
        res.status(200).json({
            success:true, 
            message : "Email verified successfully.",
            user : {
                ...user._doc,
                password : undefined,
            }
        });
    } catch (error) {
        console.log("Error in : ",error);
        res.status(500).json({success:false, message : "Server error", error});
    }
};
export const login = async (req, res) => {
    res.send("Login routes are available");
};
export const logout = async (req, res) => {
    res.send("Logout routes are available");
};