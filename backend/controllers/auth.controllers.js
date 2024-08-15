import { response } from "express";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";
export const signup = async (req, res) => {
    const {email, password, name} = req.body;
    try {
        if(!email || !password || !name) {
            throw new Error ("All fields are required.");
        }
        const userAlreadyExists = await User.findOne({ email });
        console.log ("userAlreadyExists : ",userAlreadyExists);
        if(userAlreadyExists) {
            return res.status(400).json({success:false, message: "User already exists"});
        }       
        const hasPassword = await bcryptjs.hash(password, 12);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User ({
            email,
            password : hasPassword,
            name,
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
export const login = async (req, res) => {
    res.send("Login routes are available");
};
export const logout = async (req, res) => {
    res.send("Logout routes are available");
};