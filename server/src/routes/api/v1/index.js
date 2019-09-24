import express from 'express';

import controller from '../../../controllers/api/v1/index';

const router = express.Router();

/**
 * /api/v1/users/
 * endpoints for handling friend requests.
 * /users for fetching all users
 * /users/search for searching a user by email
 * /users/delete for deleting a user
 * */

/* DISPLAY all users */
router.get('/users', controller.usersController.getAllUsers);

/* SEARCH a User by email */
router.get('/users/search/:searchText', controller.usersController.searchUser);

/*
 *  /api/v1/friends/
 *  endpoints for handling friend requests.
 * /search for searching friend by email ID
 * /add in case of accept friend request and adding to friends' list
 * /delete in case of removing a user from friends' list
 */

router.post('/friends/add', (req, res) => {
  res.send(`Received a request to add a friend via sender/receiver info`);
});

router.get('/friends/', (req, res) => {
  res.send(`Received a request to fetch all friends`);
});

router.get('/friends/search/:query');

router.post('/friend/request', (req, res) => {
  res.send(
    `Received a request to send a friend request from sender to receiver`
  );
});

/* DELETE a user from current user's friends list */
router.delete('/friends/delete', (req, res) => {
  res.send(`Received a request to add user: ${req.body.id}`);
});

export default router;
