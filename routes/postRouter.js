import express from "express";
import { createPost, getAllPosts, likePost } from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/create", authMiddleware, createPost);
router.get("/all", authMiddleware, getAllPosts);
router.post("/like", authMiddleware, likePost);

export default router;
