import express from 'express';
import { auth } from '../middlewares/auth.js';
import { rules } from '../middlewares/validators.js';
import {
    deleteUser,
    getAllUsers,
    getSingleUser,
    loginUser,
    refreshPage,
    registerUser,
    removeFriend,
    updateUser,
    addFriend,
    getUserFriends,
    searchUsers,
} from '../controllers/usersController.js';

const router = express.Router();

// users/register
router.post('/register', rules, registerUser);

// users/login
router.post('/login', loginUser);

// getAllUsers
router.get('/', getAllUsers);

// get request "users/:id/friends/:id"

router.get('/getUserFriends/:id', auth, getUserFriends);

// post request add users/:id/friends
router.post('/addFriend/:id', auth, addFriend);

//
router.post("/removeFriend/:id", auth, removeFriend);

// get SingleUser
router.get('/:id', auth, getSingleUser);

// update singleUser
router.patch('/:id', auth, updateUser);

// delete singleUser
router.delete('/:id', auth, deleteUser);

// get refreshPage
router.post('/refreshPage', auth, refreshPage);

// post searchUsers
router.post('/search', auth, searchUsers);

export default router;
