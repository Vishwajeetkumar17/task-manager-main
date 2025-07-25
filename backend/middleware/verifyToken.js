const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Make sure .env is loaded
require("dotenv").config();

async function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ error: "Invalid token: user not found" });
        }

        req.user = user; // Attach user info to request
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = verifyToken;
