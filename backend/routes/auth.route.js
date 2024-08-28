import express from "express";
const router = express.Router();
import {
	login,
	logout,
	signup,
	verifyEmail,
	forgotPassword,
	resetPassword,
	additionalInformation,
	checkAuth } from "../controllers/auth.controllers.js";

import { verifyToken } from "../middleware/verifyToken.js";
/// router index
router.get('/check-auth', verifyToken ,checkAuth);

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', verifyToken , logout);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/additional-information',verifyToken, additionalInformation);
export default router;