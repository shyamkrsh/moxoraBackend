import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        senderId: { type: String, required: true },
        receiverId: { type: String, required: true },
        message: { type: String },
        media: { type: String }, 
        mediaType: { type: String }, 
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;

