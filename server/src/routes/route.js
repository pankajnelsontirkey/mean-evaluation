const express = require('express');

const controller = require('../controllers/controller');

const router = express.Router();

/* Test endpoint GET */
router.get('/test', controller.testGet);

/* Test endpoint POST */
router.post('/test', controller.testPost);

/* Signup endpoint */
router.post('/signup', controller.signup);

/* Login endpoint */
router.post('/login', controller.login);

module.exports = router;
