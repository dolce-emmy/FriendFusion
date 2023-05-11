import PostCollection from "../models/postSchema.js";



// getAllPost//
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostCollection.find().populate('userId', 'picturePath');
    res.status(200).json({success: true, data:posts});
  } catch {
    res.status(500).json({ message: error.message });
  }
};

//get all single post//

export const getSinglePost = async (req, res) => {
    try {
        const post = await PostCollection.findById(req.params.id).populate("userId", "picturePath");
        res.status(200).json({success: true, data:post});
    } catch {
        res.status(500).json({ message: error.message });
    }
}

// for new post//
export const createPost = async (req, res) => {
  const {description} = req.body;
  const newPost = new PostCollection({description});
  try {
    await newPost.save();
    res.status(201).json({success: true, data:newPost});
  } catch (error) {
    res.status(500).json({success: false, message: error.message });
  }
};

//like post //

//here we want to update the post with the like button so we will use patch method//
// we will use the id of post to like the post//
export const likePost = async (req, res) => {

    try{
        const postId = req.params.id;
        const userId = req.body.userId;

        const post = await PostCollection.findById(postId);

        // here I am checking if the user has already liked the post or not
        // if the user has not liked the post then I will add the user to the likes array
        // if the user has already liked the post then I will remove the user from the likes array
        // here I am using the includes method to check if the user is already in the likes array or not
        if(!post.likes.includes(userId)){
          post.likes.push(userId)
        } else {

           post.likes = post.likes.filter(user => user.toString() !== userId)
        }
        // here I am saving the post after updating the likes array so that the changes are reflected in the database
         
        post.save()
        res.status(200).json({success:true, data: post})
       
    }catch(error) {
        res.status(500).json({ message: error.message });
    }
}


// to upload image to post//




// export const likePost = async (req, res) => {
//     try {
//         const post = await PostCollection.findById(req.params.id);

//         // here I am checking if the user has already liked the post or not 
//         // if the user has not liked the post then I will add the user to the likes array
//         // if the user has already liked the post then I will remove the user from the likes array

//         if (!post.likes.includes(req.body.userId)) {
//             await post.updateOne({ $push: { likes: req.body.userId } });
//             res.status(200).json({ message: "Post has been liked" });
//         } else {
//             await post.updateOne({ $pull: { likes: req.body.userId } });
//             res.status(200).json({ message: "Post has been disliked" });
//         }
//     } catch {
//         res.status(500).json({ message: error.message });
//     }
// }

// for update post//


export const updatePost = async (req, res) => {
  try {
      const user = req.body.userId
    const updatedPost = await PostCollection.findById(req.params.id).populate("userId", "picturePath");
    
    // here I am checking if the user is the same user who created the post or not
    // if the user is the same user who created the post then I will update the post
    // if the user is not the same user who created the post then I will send a message that the user can only update his own post
    
    if (updatedPost.userId.toString() === user) {

      

      await updatedPost.updateOne({ $set: req.body });
      res.status(200).json({success: true, data:updatedPost});
    } else {

      res.status(403).json({success: false, message: "You can update only your post" });
    }

    }catch(error) {
      res.status(500).json({success: false, message: error.message });
    }
  };
  



// for delete post//
export const deletePost = async (req, res) => {
  try {
    const user = req.body.userId
    const deletePost = await PostCollection.findById(req.params.id);
    if (deletePost.userId.toString() === user) {
      await deletePost.deleteOne();
      res.status(200).json({success: true, data: deletePost });
    } else {
      res.status(403).json({success: false, message: "You can delete only your post" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
