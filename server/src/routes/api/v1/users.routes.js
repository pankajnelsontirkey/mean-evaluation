/**
 *
 * USERS ROUTES
 *
 */

import express from 'express';

import usersController from '../../../controllers/api/v1/usersControllers';

const usersRoutes = express.Router();

/* DISPLAY all users */
usersRoutes.get('/', usersController.getAllUsers);

/* SEARCH a User by email */
usersRoutes.get('/search/:searchText', usersController.searchUser);

export default usersRoutes;
