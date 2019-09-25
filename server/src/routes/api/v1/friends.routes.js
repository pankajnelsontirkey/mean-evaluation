/**
 *
 * FRIENDS ROUTES
 *
 */

import express from 'express';

import friendsController from '../../../controllers/api/v1/friendsController';

const friendsRoutes = express.Router();

/* ADD-FRIEND: make a friend connection between two users */
friendsRoutes.post('/friends/add', friendsController.addFriend);

/* GET-ALL-FRIENDS: fetch all friends of a user */
friendsRoutes.get('/friends', friendsController.getAllFriends);

// /* DELETE: delete a user from current user's friends list */
// friendsRoutes.delete('/friends/delete', friendsController.deleteFriend);

// /* SEARCH FRIEND: search a friend in friends list  */
// friendsRoutes.get('/friends/search/:query');

export default friendsRoutes;
