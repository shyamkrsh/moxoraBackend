import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        caption: { type: String, maxlength: 2200 },
        mediaUrl: { type: String },
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        comments: [
            {
                user: { type: Schema.Types.ObjectId, ref: "User" },
                text: { type: String, required: true },
                createdAt: { type: Date, default: Date.now }
            }
        ]
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post