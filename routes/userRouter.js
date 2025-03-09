import express from 'express';
import { register, login, getUserDetails, updateUserInfo } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/userDetails", authMiddleware, getUserDetails);
router.get("/update", authMiddleware, updateUserInfo);

export default router;
