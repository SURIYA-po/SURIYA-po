const User = require("../models/User");
const { signToken } = require("../middlewares/signToken");
const jwt = require('jsonwebtoken');
const cloudinary = require("../config/cloudinary");
// src/controllers/authController.js


exports.register = async (req, res) => {
  try {
console.log("Cloudinary:", cloudinary);
console.log("Uploader:", cloudinary.uploader);


    const { name, email, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, or password",
        received: req.body
      });
    }

    // Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Handle avatar file (if uploaded)
    let avatarUrl = null;
    if (req.file) {
     const result = await cloudinary.uploader.upload(
    `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
    {
      folder: "avatars",
    }
  );

  avatarUrl = result.secure_url;
  public_id=result.public_id;
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      role: role || "user",
      avatar: avatarUrl,
      public_id:public_id
    });

    await user.save();

   
    const token = jwt.sign(
      { id: user._id, role: user.role },
       process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Send detailed error in development
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const matched = await user.matchPassword(password);
    if (!matched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = signToken(user);

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

