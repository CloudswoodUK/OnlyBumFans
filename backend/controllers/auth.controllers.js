import { response } from "express";
import axios from "axios";
import moment from "moment";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import multer from "multer";
import fs from "fs";
import path from "path";

import mime from "mime-types";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
} from "../mailtrap/emails.js";
const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

////////////////

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = join(__dirname, "../../frontend/public/profile");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const fileExtension = file.originalname.split(".").pop().toLowerCase();
  const mimeType = mime.lookup(file.originalname);

  if (
    !allowedExtensions.includes(fileExtension) ||
    !["image/jpeg", "image/png"].includes(mimeType)
  ) {
    return cb(
      new Error(
        "Invalid file type. Only .jpg, .jpeg, and .png files are allowed."
      )
    );
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });
///////////////
export const signup = async (req, res) => {
  const { email, password, name, gender, country, dateOfBirth } = req.body;
  try {
    if (!email || !password || !name || !gender || !country || !dateOfBirth) {
      throw new Error("All fields are required.");
    }
    const age = calculateAge(dateOfBirth);
    if (age < 18) {
      return res
        .status(400)
        .json({
          success: false,
          message: "You need to be at least 18 years old to create account.",
        });
    }
    const userAlreadyExists = await User.findOne({ email });
    console.log("userAlreadyExists : ", userAlreadyExists);
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }
    const hasPassword = await bcryptjs.hash(password, 12);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const userCount = await mongoose.models.User.countDocuments();
    const userSequenceNumberGenerated = (userCount + 1).toString();
    const creditValue = "0";

    const user = new User({
      userRegistrationId: Math.floor(Math.random() * 1e11)
        .toString()
        .padStart(11, "0"),
      userSequenceNumber: userSequenceNumberGenerated,
      email,
      password: hasPassword,
      name,
      gender,
      dateOfBirth,
      country,
      credit: Number(creditValue).toFixed(2),
      isOnline: true,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 * 60 * 60 * 1000 => 24 hrs
    });
    await user.save();
    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "You have successfully signed.",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid or expired verification code.",
        });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.name);
    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in : ", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Password did not match." });
    }
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    user.isOnline = true;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login : ", error);
    res.status(500).json({ success: false, message: "Login error : ", error });
  }
};
export const logout = async (req, res) => {
  try {
    console.log("UserID in request:", req.userID);

    if (!req.userID) {
      return res
        .status(400)
        .json({ success: false, message: "User ID not found in request." });
    }

    const user = await User.findById(req.userID);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    user.isOnline = false;
    await user.save();

    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.log("Error in logout:", error);
    res.status(500).json({ success: false, message: "Logout error:", error });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "This email does not exist." });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
      user.name
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Password reset link sent to your email address.",
      });
  } catch (error) {
    console.log("Error in forgot password email : ", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Forgot password email error : ",
        error,
      });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      res
        .status(400)
        .json({
          success: false,
          message: "Invalid or expired link. Please try again.",
        });
    }
    const hasPassword = await bcryptjs.hash(password, 12);
    user.password = hasPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    await sendPasswordResetSuccessEmail(user.email, user.name);
    res
      .status(200)
      .json({ success: true, message: "Password reset was successful." });
  } catch (error) {
    console.log("Error in reset password email : ", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Reset password email error : ",
        error,
      });
  }
};
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userID).select("-password");
    if (!user) {
      res.status(400).json({ success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in Sync Authentication : ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const additionalInformation = (req, res) => {
  upload.single("profilePicture")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const { maritalStatus, habitOfSmoking, habitOfDrinking, wantsToTravel } =
      req.body;
    const profilePicture = req.file;

    try {
      if (
        !profilePicture ||
        !maritalStatus ||
        !habitOfDrinking ||
        !habitOfSmoking ||
        wantsToTravel === undefined
      ) {
        throw new Error("All fields are required.");
      }

      if (!req.userID) {
        return res
          .status(400)
          .json({ success: false, message: "User ID not found in request." });
      }
      const userId = await User.findById(req.userID);
      const profilePicPath = `/profile/${profilePicture.filename}`;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          maritalStatus,
          habitOfSmoking,
          habitOfDrinking,
          wantsToTravel,
          profilePicture: profilePicPath,
        },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("User not found.");
      }

      res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        user: {
          ...updatedUser._doc,
          password: undefined,
        },
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
};


export const updateProfileInformation = async (req, res) => {
  upload.single('profilePicture')(req, res, async (err) => {
    if (err) {
      console.log("Upload error:", err);
      return res.status(400).json({ success: false, message: err.message });
    }

    const { name, gender, country, maritalStatus, habitOfSmoking, habitOfDrinking, wantsToTravel } = req.body;
    const profilePicture = req.file ? `/profile/${req.file.filename}` : undefined;

    console.log("Received data:", { name, gender, country, maritalStatus, habitOfSmoking, habitOfDrinking, wantsToTravel, profilePicture });

    try {
      if (!name || !gender || !country || !maritalStatus || !habitOfSmoking || !habitOfDrinking || wantsToTravel === undefined) {
        throw new Error('All fields are required.');
      }

      if (!req.userID) {
        return res.status(400).json({ success: false, message: 'User ID not found in request.' });
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.userID,
        {
          name,
          gender,
          country,
          maritalStatus,
          habitOfSmoking,
          habitOfDrinking,
          wantsToTravel,
          profilePicture
        },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error('User not found.');
      }

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully.',
        user: {
          ...updatedUser._doc,
          password: undefined,
        },
      });
    } catch (error) {
      console.log("Update error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  });
};
