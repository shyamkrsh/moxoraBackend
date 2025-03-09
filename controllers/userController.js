import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { emailOrMobile, password } = req.body;
        const existingUser = await User.findOne({ emailOrMobile });
        if (existingUser) return res.json({ message: "User already exists" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ emailOrMobile, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", data: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { emailOrMobile, password } = req.body;
        const user = await User.findOne({ emailOrMobile });
        if (!user) return res.json({ message: "Invalid email or phone number", success: false, error: true });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ message: "Invalid credentials", success: false, error: true });
        const token = jwt.sign({ id: user._id }, "JWT_SECRET", { expiresIn: "7d" });
        res.status(200).json({ message: "Login successful", token, userId: user._id, success: true, error: false });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserDetails = async (req, res) => {
    const { userId } = req.body;
    try {
        console.log("hello - ", userId)
        if (!userId) {
            return res.status(400).json({
                message: "User ID missing in request",
                success: false,
                error: true
            });
        }
        const userDetails = await User.findById(userId).select("-password");
        console.log("user Details - ", userDetails)
        if (!userDetails) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            });
        }
        res.status(200).json({
            message: "User details retrieved successfully",
            data: userDetails,
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Error fetching user details:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: true
        });
    }
};

export const updateUserInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            message: "User information updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
