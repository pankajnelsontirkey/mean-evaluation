import express from 'express';

const router = express.Router();

router.get('/users', (req, res) => {
  res.send(`Received a GET request at '/api/v1/users'`);
});

router.post('/users', (req, res) => {
  res.send(`Received a POST request at '/api/v1/users'`);
});

export default router;
