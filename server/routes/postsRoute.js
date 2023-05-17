import express from 'express';
import {
    getAllPosts,
    getSinglePost,
    createPost,
    likePost,
    updatePost,
    deletePost,
    getAllPostsByUserId,
} from '../controllers/postsController.js';

const router = express.Router();

//getAllPost//
router.get('/', getAllPosts);

//getAllPost by userId//
router.get('/user/:id', getAllPostsByUserId);

//get all single post//
router.get('/:id', getSinglePost);

// for new post//
router.post('/', createPost);

// for uploading image to post//

//like post //

router.post('/:id/like', likePost);

// update post//
router.patch('/:id', updatePost);

// for delete post//
router.delete('/:id', deletePost);

export default router;

/// /post/id  - delete
// /post/id - patch
