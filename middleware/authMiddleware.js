import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log("hello")
  const token = req?.header("Authorization");
  console.log(token);
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    const verified = jwt.verify(token, "JWT_SECRET");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
