import bcrypt from "bcryptjs";

import User from "../models/user_Model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signUp = async (req, res) => {
  try {
    const { fullName, username, password, gender } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exits" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // console.log(username,password)

    const user = await User.findOne({ username });

    const isPassword = await bcrypt.compare(password, user?.password);
    if (!user || !isPassword) {
      return res.status(400).json({ error: "Invalid credential" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error in Login" });
  }
};

export const logOut = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully!!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error in Login" });
  }
};
