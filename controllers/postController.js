import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        const { caption, mediaUrl } = req.body;
        const userId = req?.user?.id;
        const newPost = new Post({ user: userId, caption, mediaUrl });
        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "email").populate("likes").populate("comments.user");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const likePost = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });
        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
        } else {
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
        }
        await post.save();
        res.status(200).json({ message: "Post liked/unliked", likes: post.likes.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

