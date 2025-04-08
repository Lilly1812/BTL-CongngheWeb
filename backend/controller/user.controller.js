import User from "../model/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("❌ Error in Get All Users:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}