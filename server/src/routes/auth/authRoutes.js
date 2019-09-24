import express from 'express';

import authController from '../../controllers/auth/authController';

const router = express.Router();

/* REGISTER */
router.post('/register', authController.register);

/* VERIFY EMAIL TOKEN */
router.get('/verify/:emailToken', authController.verifyEmail);

/* LOGIN */
router.post('/login', authController.login);

/* AUTOLOGIN */
router.get('/login/:loginToken', authController.getAutoLoginData);

/* LOGOUT */
router.get('/logout/:loginToken', authController.logout);

export default router;
