import express from 'express';
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
router.post('/register', registerUser);

// users/login
router.post('/login', loginUser);

// getAllUsers
router.get('/', getAllUsers);

// get request "users/:id/friends/:id"

router.get('/getUserFriends/:id', getUserFriends);

// post request add users/:id/friends
router.post('/addFriend/:id', addFriend);

//
router.delete('/removeFriend/:id', removeFriend);

// get SingleUser
router.get('/:id', getSingleUser);

// update singleUser
router.patch('/:id', updateUser);

// delete singleUser
router.delete('/:id', deleteUser);

// get refreshPage
router.get('/refreshPage', refreshPage);

// get searchUsers
router.get('/searchUsers/:searchTerm', searchUsers);

export default router;
