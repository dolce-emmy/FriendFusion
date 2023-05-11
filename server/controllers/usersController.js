import UserCollection from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import ImageCollection from "../models/imageSchema.js";

export const registerUser = async (req, res) => {
  try {
    const user = new UserCollection(req.body);
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(201).json({ success: true, users: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserCollection.findOne({ email });
    if (user) {
      const verifyPassword = bcrypt.compareSync(password, user.password);
      if (verifyPassword) {
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.header("token", token).json({ success: true, users: user });
      } else {
        res.status(403).json({
          success: false,
          data: "Invalid password",
        });
      }
    } else {
      res.status(403).json({ success: false, data: "Invalid email" });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserCollection.find();
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const refreshPage = async (req, res) => {
  res.json({ success: true, user: req.user });
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserCollection.findById(id);
    if (user) {
      res.status(200).json({ success: true, users: user });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
   //console.log(id)
    
 

    if (req.files) {
        const { file } = req.files;
      const fileName = new Date().getTime() + "-" + file.name;
      const contentType = file.mimetype; //'image/png'
      const extension = contentType.split("/")[1]; // 'png'
      // 123454321234-new-size.png => extension
      const fileNameWithoutExtension = fileName.replace("." + extension, "");

      // console.log
      //console.log(fileNameWithoutExtension)

      const result = await cloudinary.v2.uploader.upload(
        file.tempFilePath,
        // 123454321234-new-size.png
        { public_id: fileNameWithoutExtension }
      );

        console.log(result)
      
      
        
          const createdImage = await ImageCollection.create({
                name: fileName,
                size: result.bytes,
                url: result.secure_url,
                contentType: result.format,
                // userId: req.user._id,
              });
      
            //   userUpdate.profileImage = createdImage.url;
      
            //   await userUpdate.save();
            const user = await UserCollection.findByIdAndUpdate(id,{...req.body, profileImage:createdImage.url},{new:true});
           
              return res.status(200).json({ success: true, users: user });
      
    }

    const updateUser = await UserCollection.findByIdAndUpdate(id,req.body,{new:true});
  
    
    res.status(200).json({ success: true, users: updateUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserCollection.findByIdAndDelete(id);
    res.status(200).json({ success: true, users: deletedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const { friendId } = req.body;
    const user = await UserCollection.findById(id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    } else {
      const friend = await UserCollection.findById(friendId);
      if (!friend) {
        res.status(404).json({ success: false, message: "Friend not found" });
      } else {
        const isFriend = user.friends.includes(friendId);
        if (isFriend) {
          res
            .status(400)
            .json({ success: false, message: "Friend already added" });
        } else {
          user.friends.push(friendId);
          await user.save();
          res.status(201).json({
            success: true,
            
            users: user,
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const { friendId } = req.body;
    const user = await UserCollection.findById(id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    } else {
      const isFriend = user.friends.includes(friendId);
      if (!isFriend) {
        res.status(400).json({ success: false, message: "Friend not found" });
      } else {
        user.friends = user.friends.filter(
          (friend) => friend.toString() !== friendId.toString()
        );
        await user.save();
        res.status(200).json({
          success: true,
         
          users: user,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserCollection.findById(id).populate("friends");
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    } else {
      res.status(200).json({ success: true, users: user.friends });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
