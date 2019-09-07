const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const controller = require('../controllers/controller');

const router = express.Router();
const SECRET = process.env.TOKEN_SECRET;
/* Test endpoint GET */
router.get('/test', controller.testGet);

/* Test endpoint POST */
router.post('/test', controller.testPost);

/* Signup endpoint */
// router.post('/signup', controller.signup);
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

/* Login endpoint */
// router.post('/login', passport, controller.login);
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred!');
        return next(error);
      }
      req.login(user, { session: false }, async error => {
        if (error) {
          return next(error);
        }
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, SECRET);
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
