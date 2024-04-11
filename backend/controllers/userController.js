import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Create user
// @route   POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  const user = await newUser.save();
  generateToken(user._id, res);
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalide email or password");
  }

  const matchPassword = await user.matchPassword(password);
  if (!matchPassword) {
    res.status(400);
    throw new Error("Invalide email or password");
  }

  generateToken(user._id, res);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
});

// @desc    Logout User
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: new Date(0),
  });
  res.status(200).json({ message: "Logout successfully" });
});

// @desc    Get Current Logged In User
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    res.status(400);
    throw new Error("Something went wrong");
  }
  res.status(200).json(user);
});

export { createUser, loginUser, logoutUser, getMe };
