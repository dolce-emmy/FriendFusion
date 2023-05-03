import UserCollection from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const user = new UserCollection(req.body);
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(201).json({success: true, data: user});

    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserCollection.findOne({ email:email });
        if (user) {
            const verifyPassword = bcrypt.compareSync(password, user.password);
            if (verifyPassword) {
                const token = jwt.sign(
                    {_id: user._id, email: user.email},
                    process.env.JWT_SECRET,
                    {expiresIn: "1h"}
                );
                res.header('auth-token', token).json({
                    success: true,
                    data: user,
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid password",
                });
            }
        } else {
            res.status(400).json({ success: false, message: "Invalid email" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserCollection.find();
        res.status(200).json({success: true, data: users});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

export const refreshPage = async (req, res) => {
    res.json({success: true, data: req.user})
};

export const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserCollection.findById(id);
        if (user) {
            res.status(200).json({success: true, data: user});
        } else {
            res.status(404).json({success: false, message: "User not found"});
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateUser = await UserCollection.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        res.json({success: true, data: updateUser});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserCollection.findByIdAndDelete(id);
        res.json({ success: true, data: deletedUser });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

export const addFriend = async (req, res) => {
    try {
        const { id } = req.params;
        const { friendId } = req.body;
        const user = await UserCollection.findById(id);
         if (!user) {
            res.status(404).json({success: false, message: "User not found"});
         } else {
            const friend = await UserCollection.findById(friendId);
            if (!friend) {
                res.status(404).json({success: false, message: "Friend not found"});
            } else {
                const isFriend = user.friends.includes(friendId);
                if (isFriend) {
                    res.status(400).json({success: false, message: "Friend already added"});
                } else {
                    user.friends.push(friendId);
                    await user.save();
                    res.status(201).json({
                        success: true,
                        message: "Friend added successfully",
                        data: user
                    });
                }
            }
         }
             
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

export const removeFriend = async (req, res) => {
    try {
        const { id } = req.params;
        const { friendId } = req.body;
        const user = await UserCollection.findById(id);
        if (!user) {
            res.status(404).json({success: false, message: "User not found"});
        } else {
            const isFriend = user.friends.includes(friendId);
            if (!isFriend) {
                res.status(400).json({success: false, message: "Friend not found"});
            } else {
                user.friends = user.friends.filter((friend) => friend.toString() !== friendId.toString());
                await user.save();
                res.status(201).json({ 
                    success: true,
                     message: "Friend removed successfully",
                      data: user
                     });
            }
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserCollection.findById(id).populate("friends");
        if (!user) {
            res.status(404).json({success: false, message: "User not found"});
        } else {
            res.status(200).json({success: true, data: user.friends});
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

export const searchUsers = async (req, res) => {
    try {
        const { searchTerm } = req.params;
        const users = await UserCollection.find({
            $or: [
                { firstName: { $regex: searchTerm, $options: "i" } },
                { lastName: { $regex: searchTerm, $options: "i" } },
                { email: { $regex: searchTerm, $options: "i" } },
            ],
        });
        res.status(200).json({success: true, data: users});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

