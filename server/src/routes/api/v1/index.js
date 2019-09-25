import express from 'express';

import usersRoutes from './users.routes';
import friendsRoutes from './friends.routes';
import requestsRoutes from './requests.routes';
import notificationsRoutes from './notifications.routes';

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/friends', friendsRoutes);
router.use('/requests', requestsRoutes);
router.use('/notifications', notificationsRoutes);

export default router;
