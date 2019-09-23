import express from 'express';

import authController from '../../controllers/authController';

const router = express.Router();

/* REGISTER */
router.post('/register', authController.register);

/* LOGIN */
router.post('/login', authController.login);

/* VERIFY EMAIL TOKEN */
router.get('/verify/:emailToken', authController.verifyEmail);

/* AUTOLOGIN */
router.get('/login/:loginToken', authController.getLoginByUserId);

router.get('/logout/:id', authController.logout);

export default router;
