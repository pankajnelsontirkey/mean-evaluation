import express from 'express';

import authController from '../controllers/authController';

const router = express.Router();

/* router.get('/login', (req, res) => {
  res.send('received GET req at /login');
}); */

router.post('/login', authController.login);

/* router.get('/signup', (req, res) => {
  res.send('received GET req at /signup');
}); */

router.post('/signup', authController.signup);

router.post('/verify/:token', authController.verifyEmail);

export default router;
