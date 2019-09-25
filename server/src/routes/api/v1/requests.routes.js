/**
 *
 * REQUESTS ROUTES
 *
 */

import express from 'express';

import requestsController from '../../../controllers/api/v1/requestsController';

const requestsRoutes = express.Router();

/* ADD REQUEST: send a request to from senderId to ReceiverId */
requestsRoutes.post('/send', requestsController.addRequest);

/* FETCH REQUESTS: get requests (friend/share) for a user with userID from db */
requestsRoutes.get('/view/:userId', requestsController.viewRequests);

/* DELETE REQUEST: delete a request from the receivers document */
requestsRoutes.delete('/:/userId/requestId', requestsController.deleteRequest);

export default requestsRoutes;
