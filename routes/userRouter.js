import express from 'express';
import { register, login, getUserDetails, updateUserBio, updateUserPic, getPostedBy } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/userDetails", authMiddleware, getUserDetails);
router.patch("/updateBio", authMiddleware, updateUserBio);
router.patch("/updatePic", authMiddleware, updateUserPic);
router.get("/getPostedBy", getPostedBy);

export default router;
