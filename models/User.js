import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username : {type : String, required : true},
    emailOrMobile: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    profilePic: { type: String, default: "" },
    bio: { type: String, maxlength: 150 },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    reels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reel" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
