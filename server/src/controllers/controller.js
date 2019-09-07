const userModel = require('../models/models').userModel;

/* const login = (req, res) => {
  console.log(res.body);
}; */

/* const signup = (req, res) => {
  let newUser = new userModel(req.body);
  newUser.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(user);
  });
}; */

const testGet = (req, res) => {
  /* let number = req.body.number;
  number % 3 === 0 && number % 5 === 0
    ? res.send('Fizzbuzz')
    : number % 3 === 0
    ? res.send('Fizz')
    : number % 5 === 0
    ? res.send('Buzz')
    : res.json({ error: 'Bad number' }); */
  userModel.find({}).then(data => {
    res.json(data);
  });
};

const testPost = (req, res) => {
  console.log(`[testPost] received ${req}`);

  let user = new userModel(req.body);
  user.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(user);
  });
  /* .then(user => {
      res.status(200).json(user);
    })
    .catch(e => {
      res.send(e);
    }); */
};

module.exports = { /* login, signup, */ testGet, testPost };
