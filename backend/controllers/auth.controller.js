import { signToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import { signupSchema } from "../lib/validations/user.validation.js";
import config from "../lib/config.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "Email and password are required",
      });
    }

    // Find user + password
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        data: [],
        message: "Invalid email or password",
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        data: [],
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = signToken({ id: user._id });

    // Remove password before sending
    const { password: _, ...userData } = user._doc;

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",       // localhost only
      sameSite: "lax",    // REQUIRED for fetch()
      path: "/",           // important
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      data: [userData],
      message: "You have successfully logged in",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: [],
      message: "Internal Server Error",
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        data: [],
        message: parsed.error.issues[0].message,
      });
    }

    const { name, email, password } = parsed.data;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create JWT immediately after signup (optional but common)
    const token = signToken({ id: user._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userData } = user._doc;

    res.status(201).json({
      success: true,
      data: [userData],
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: [],
      message: "Internal Server Error",
    });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    success: true,
    data: [],
    message: "Logged out successfully",
  });
};
