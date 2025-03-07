import express from 'express';
import { register, login } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/useDetails", authMiddleware, getUserDetails);

export default router;
