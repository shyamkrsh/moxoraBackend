import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        const { caption, uploadedUrl, userId } = req.body;
        const newPost = new Post({ user: userId, caption, mediaUrl: uploadedUrl });
        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "email").populate("likes").populate("comments.user");
        console.log("Total Posts - ", posts)
        res.status(200).json({
            message: "Sending all posts",
            data: posts,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
            success: false,
            error: true
        });
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
export const commentPost = async (req, res) => {
    try {
        const { postId, text } = req.body;
        const userId = req.user?.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false,
                error: true
            });
        }
        const newComment = {
            userId,
            text,
            createdAt: new Date()
        };

        post.comments.push(newComment);
        await post.save();
        res.status(200).json({
            message: "Comment added successfully",
            success: true,
            error: false,
            data: newComment
        });
    } catch (err) {
        console.error("Error adding comment:", err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: true
        });
    }
};
export const updatePost = async (req, res) => {
    try {
        const { postId, updateData } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost,
        });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { userId, postedById, postId } = req.body;
        if (userId != postedById) {
            throw new Error("UnAthorized Access!")
        }
        const deletedPost = await Post.findByIdAndDelete(postId);
        console.log(deletedPost);
        res.status(200).json({
            message: "Post has been deleted",
            data: deletedPost,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server error",
            data: [],
            success: false,
            error: true,
        })
    }

}