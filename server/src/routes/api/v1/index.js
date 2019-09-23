import express from 'express';

const router = express.Router();

/**
 * /api/v1/users/
 * endpoints for handling friend requests.
 * /users for fetching all users
 * /users/search for searching a user by email
 * /users/delete for deleting a user
 * */

/* DISPLAY all users */
router.get('/users', (req, res) => {
  res.send(`Received a GET request at '/api/v1/users'`);
});

/* SEARCH a User */
router.get('/users/search', (req, res) => {
  res.send(`Received a request to fetch user by id: ${req.body.email}`);
});

/* DELETE a user from current user's friends list */
router.delete('/users/delete', (req, res) => {
  res.send(`Received a request to add user: ${req.body.id}`);
});

/*
 *  /api/v1/friends/
 *  endpoints for handling friend requests.
 * /search for searching friend by email ID
 * /add in case of accept friend request and adding to friends' list
 * /delete in case of removing a user from friends' list
 */

router.get('/friends/search', (req, res) => {
  res.send(`Received a request to search a friend by email`);
});

router.post('/friend/request', (req, res) => {
  res.send(
    `Received a request to send a friend request from sender to receiver`
  );
});

router.post('/friends/add', (req, res) => {
  res.send(`Received a request to add a friend via sender/receiver info`);
});

export default router;
