import express from "express";
const router = express.Router();
import {
	login,
	logout,
	signup,
	verifyEmail
} from "../controllers/auth.controllers.js";

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-email', verifyEmail);

export default router;