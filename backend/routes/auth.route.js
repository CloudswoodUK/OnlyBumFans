import express from "express";
const router = express.Router();
import {
	login,
	logout,
	signup,
	verifyEmail,
	forgotPassword,
	resetPassword,
	syncAuthentication } from "../controllers/auth.controllers.js";

import { verifyToken } from "../middleware/verifyToken.js";

router.get('/sync-auth', verifyToken ,syncAuthentication);

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
export default router;