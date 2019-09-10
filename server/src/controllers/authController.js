import { userModel } from '../models/userSchema';
import { responseHandler } from '../utils/responseHandler';
import { utils } from '../utils/utils';
import * as jwt from 'jsonwebtoken';

export const authController = {
  /**
   *  Signup a new user
   *
   */
  signup: (req, res) => {
    const user = new userModel(req.body);
    user.save(async (err, user) => {
      if (err || !user) {
        responseHandler(res, 500, err, 'Registration failed');
      } else {
        responseHandler(res, 200, null, 'Registration was successful', {
          newUser: { id: user._id, email: user.email }
        });
        try {
          let emailToken = await utils.generateEmailToken(user.email, user._id);
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
    userModel.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        responseHandler(res, 500, err, null, null);
      }
      if (!user) {
        responseHandler(res, 404, null, 'Email not found', null);
      }
      /* use model instance method to check password */
      user.verifyPassword(req.body.password).then(value => {
        if (!value) {
          responseHandler(res, 401, {
            errName: 'Invalid Credentials',
            errMsg: 'Incorrect password'
          });
        } else {
          /* let loginToken =  await*/
          utils.generateLoginToken(user._id, user.role).then(loginToken => {
            responseHandler(res, 200, null, 'Logged in successfully', {
              user: { id: user._id, token: loginToken }
            });
          });
        }
        /* if password matches, proceed to generate loginToken */
      });
    });
  }
};
