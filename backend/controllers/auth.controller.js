const User = require("../models/user.model");
const createAccessToken = require("../services/createToken");
const { validateEmail, validatePassword } = require("../utils/validate");
const bcrypt = require("bcryptjs");

async function userSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // 1. Basic field check
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill all the details" });
    }

    // 2. Format validation
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid email" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists:", email);
      return res.status(409).json({ error: "User already registered" });
    }

    // 4. Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Account successfully created" });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function userLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the details" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = createAccessToken({ id: user.id });

    const sanitizedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
    };


    return res.status(200).json({
      token,
      user: sanitizedUser,
      success: true,
      message: "Login successful",
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  userSignup,
  userLogin,
};
