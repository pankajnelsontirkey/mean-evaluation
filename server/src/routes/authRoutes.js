import express from 'express';

import authController from '../controllers/authController';

const router = express.Router();

router.post('/login', authController.login);

router.post('/signup', authController.signup);

router.get('/verify/:token', authController.verifyEmail);

export default router;
