import CommentCollection from "../models/commentSchema.js";
import PostCollection from "../models/postSchema.js";

// get all comments
export const getAllComments = async (req, res) => {
  try {
    const comments = await CommentCollection.find();

    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllCommentsByIds = async (req, res) => {
  try {
    const { ids } = req.body;
    const comments = await CommentCollection.find({
      _id: { $in: ids },
    }).populate({
      path: "user",
      model: "User",
      populate: {
        path: "image",
        model: "Image",
      },
    });

    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// get single comment by Id
export const getSingleCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await CommentCollection.findById(id);

    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// create a new comment
export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const { _id } = req.user;

    const createdComment = await CommentCollection.create({
      content,
      user: _id,
    });
    if (createdComment) {
      const post = await PostCollection.findById(postId);
      post.comments.push(createdComment);
      post.save();
      res.status(201).json({ success: true, data: createdComment });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// update comment by Id
export const updateCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = await CommentCollection.findByIdAndUpdate(
      id,
      req.body
    );
    res.status(200).json({ success: true, data: updatedComment });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// delete comment by Id
export const deleteCommentById = async (req, res) => {
  try {
    const { id, postId } = req.params;
    // find the comment and find all the replies and delete them
    // then delete this comment
    const removedComment = await CommentCollection.findByIdAndRemove(id);

    const post = await PostCollection.findById(postId);
    if (post) {
      post.comments = post.comments.filter(
        (comment) => comment.toString() !== id
      );
      await post.save();
    }

    res.status(200).json({ success: true, data: removedComment });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// reply comment by Id
export const replyCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, replies } = req.body;
    const { _id } = req.user;
    const createdComment = await CommentCollection.create({
      content,
      replies,
      user: _id,
    });

    if (createdComment) {
      const comment = await CommentCollection.findById(id).populate({
        path: "replies",
        model: "Comment",
        populate: {
          path: "user",
          model: "User",
          populate: {
            path: "image",
            model: "Image",
          },
        },
      });
      if (comment.replies) {
        comment.replies.push(createdComment);
      } else {
        comment.replies = [createdComment];
      }
      comment.save();
      res.status(200).json({ success: true, data: comment });
    }
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// delete reply by Id
export const deleteReplyById = async (req, res) => {};
