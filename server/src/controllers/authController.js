import { userModel } from '../models/userModel';
import { runInNewContext } from 'vm';

export const authController = {
  /* Signup a new user */
  signup: (req, res) => {
    const user = new userModel(req.body);
    try {
      user.save().then((error, user) => {
        if (error || !user) {
          res.status(500).send({
            error: error,
            info: 'Registration failed'
          });
        }

        res.status(200).json({
          error: null,
          info: 'Registration was successful',
          user: { _id: user._id }
        });
      });
    } catch (e) {
      throw 
      console.log(e);
    }
  },

  /* Login an existing user */
  login: (req, res) => {
    userModel.find({ email: req.body.email }, (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      if (!user) {
        res.status(404).send({ message: 'Email not found' });
      }
      res.status(200).json(user);
    });
  }
};
