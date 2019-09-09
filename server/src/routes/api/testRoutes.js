import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(`Received a GET request at '/api/v1'`);
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.send(`Received a POST request at '/api/v1'`);
});

export default router;
