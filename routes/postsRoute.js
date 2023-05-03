import express from 'express';
import { getAllPosts, getSinglePost, createPost, likePost, updatePost, deletePost } from '../controllers/postsController.js';

const router = express.Router();




//getAllPost//
router.get ('/', getAllPosts);


//get all single post//
router.post('/:id', getSinglePost);

// for new post//
router.post('/', createPost );


//like post //

//here we want to update the post with the like button so we will use patch method//
// we will use the id of post to like the post//
router.patch('/:id/like', likePost);

// update post//
router.patch('/:id', updatePost );

// for delete post//
router.delete('/:Id', deletePost );

export default router;















