import express from 'express';

import usersRoutes from './users.routes';
import friendsRoutes from './friends.routes';
import requestsRoutes from './requests.routes';
import notificationsRoutes from './notifications.routes';
import uploadRoutes from './uploads.routes';

import testRoutes from './test.routes';
import verifyAuth from '../../../middlewares/verifyAuth';

const router = express.Router();

router.use('/users', usersRoutes);
/* User-only route */
router.use('/friends', verifyAuth, friendsRoutes);
/* User-only route */
router.use('/requests', requestsRoutes);
/* User-only route */
router.use('/notifications', notificationsRoutes);
/* User-only Routes */
router.use('/files', uploadRoutes);

/* Testing route for multer/gridfs file uploads */
router.use('/test', testRoutes);

export default router;
