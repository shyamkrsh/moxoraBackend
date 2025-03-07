import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { caption, mediaUrl } = req.body;
    const userId = req.user.id; 
    const newPost = new Post({ user: userId, caption, mediaUrl });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch All Posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "emailOrMobile profilePic").sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
