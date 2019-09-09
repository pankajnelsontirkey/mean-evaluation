import { userModel } from '../models/userModel';

export const authController = {
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
  },

  signup: (req, res) => {
    const user = new userModel(req.body);
    user.save().then(user => {
      console.log(user);
      res.status(200).json(user);
    });
  }
};
