import User from "../models/user_Model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error!" });
  }
};


