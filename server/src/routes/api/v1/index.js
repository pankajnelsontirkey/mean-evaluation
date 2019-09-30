import express from 'express';

import usersRoutes from './users.routes';
import friendsRoutes from './friends.routes';
import requestsRoutes from './requests.routes';
import notificationsRoutes from './notifications.routes';
import uploadRoutes from './uploads.routes';
import checkAuthentication from '../../../middlewares/checkAuthentication';
import testRoutes from './test.routes';

const router = express.Router();

router.use('/users', checkAuthentication, usersRoutes);
router.use('/friends', friendsRoutes);
router.use('/requests', requestsRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/files', uploadRoutes);

/* Testing */
router.use('/test', testRoutes);

export default router;
