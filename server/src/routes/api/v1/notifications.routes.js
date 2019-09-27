/**
 *
 * NOTIFICATIONS ROUTES
 *
 */

import express from 'express';

import notificationsController from '../../../controllers/api/v1/notificationsController';

const notificationsRoutes = express.Router();

/* FETCH NOTIFICATIONS: get notifications (friend/share) for a user with userID from db */
notificationsRoutes.get('/', notificationsController.viewNotifications);

/* ADD REQUEST: send a notification to ReceiverId */
notificationsRoutes.post('/add', notificationsController.addNotification);

// /* DELETE REQUEST: delete a notification from the receivers document */
// notificationsRoutes.delete(
//   '/:userId/notificationId',
//   notificationsController.deleteNotification
// );

export default notificationsRoutes;
