import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { emailOrMobile, password } = req.body;
        const existingUser = await User.findOne({ emailOrMobile });
        if (existingUser) return res.status(400).json({ message: "User already exists" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ emailOrMobile, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { emailOrMobile, password } = req.body;
        const user = await User.findOne({ emailOrMobile });
        if (!user) return res.status(400).json({ message: "Invalid email or phone number" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id }, "JWT_SECRET", { expiresIn: "7d" });
        res.status(200).json({ message: "Login successful", token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};