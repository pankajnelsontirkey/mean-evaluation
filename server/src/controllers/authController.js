/* eslint-disable no-underscore-dangle */
import userModel from '../models/userSchema';
import responseHandler from '../utils/responseHandler';
import utils from '../utils/utils';
// import * as jwt from 'jsonwebtoken';

const authController = {
  /**
   *  Signup a new user
   *
   */
  signup: (req, res) => {
    // eslint-disable-next-line new-cap
    const newUser = new userModel(req.body);
    newUser.save(async (err, user) => {
      if (err || !user) {
        responseHandler(res, 500, err, 'Registration failed');
      } else {
        responseHandler(res, 200, null, 'Registration was successful', {
          newUser: { id: user._id, email: user.email }
        });
        try {
          const emailToken = await utils.generateEmailToken(
            user.email,
            user._id
          );
          /* Call nodemailer here, passing the emailVerificationToken generated in the previous step */
        } catch (e) {
          console.log(e);
        }
      }
    });
  },

  /**
   * Login an existing user
   *
   */
  login: (req, res) => {
    /* Checking if email exists in database */
    userModel.findOne({ email: req.body.email }, async (err, user) => {
      if (err) {
        responseHandler(res, 500, err, null, null);
      }
      if (!user) {
        responseHandler(res, 404, null, 'Email not found', null);
      }
      /* use model instance method to check password */
      try {
        const passwordMatch = await user.verifyPassword(req.body.password);
        if (!passwordMatch) {
          responseHandler(res, 401, {
            errName: 'Invalid Credentials',
            errMsg: 'Incorrect password'
          });
        } else {
          const loginToken = await utils.generateLoginToken(
            user._id,
            user.role
          );
          responseHandler(res, 200, null, 'Logged in successfully', {
            user: { id: user._id, token: loginToken }
          });
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
};

export default authController;
