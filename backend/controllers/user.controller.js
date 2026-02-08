import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../lib/config.js";


export const getUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res
      .status(200)
      .json({ success: true, data: users, message: "Users found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: [], message: error.message });
  }
};

export const userProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, data: [], message: "User ID is required" });
    }

    // FIND USER
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, data: [], message: "User not found" });
    }

    res.status(200).json({ success: true, data: user, message: "User found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: [], message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, data: [], message: "User ID is required" });
    }

    const { success, data, error } = signupSchema.safeParse({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    if (!success) {
      console.log(error);
      return res.status(400).json({
        success: false,
        data: [],
        message: error.issues[0].message,
      });
    }

    const { name, email, password } = data;

    // VERIFYING THAT USER EXISTS
    const userExists = await userModel.findById(id);
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, data: [], message: "User not found" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true },
    );
    res
      .status(200)
      .json({ success: true, data: updatedUser, message: "User updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: [], message: error.message });
  }
};

export const deleteUser = (req, res) => {
  res.json({ message: "Delete user" });
};

export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, data: [], message: "token not found" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, data: [], message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: [user],
      message: "User found",
    });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ success: false, data: [], message: "Internal Server Error" });
  }
};
