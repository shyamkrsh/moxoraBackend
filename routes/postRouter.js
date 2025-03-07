import express from "express";
import { createPost, getAllPosts, likePost, commentPost, updatePost } from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/create", authMiddleware, createPost);
router.get("/all", getAllPosts);
router.post("/like", authMiddleware, likePost);
router.post("/comment", authMiddleware, commentPost);
router.patch("/update", authMiddleware, updatePost);

export default router;
