/* eslint-disable new-cap */
/* eslint-disable no-underscore-dangle */
import * as jwt from 'jsonwebtoken';

import responseHandler from '../utils/responseHandler';
import userModel from '../models/userSchema';
import utils from '../utils/utils';
import { config, options, verificationLink } from '../config/mailConfig';
import Mailer from '../utils/nodemailer';

const authController = {
  /**
   *  Signup a new user
   */
  signup: (req, res) => {
    const newUser = new userModel(req.body);
    newUser.save(async (err, userItem) => {
      if (err || !userItem) {
        responseHandler(res, 500, err, 'Registration failed', null);
      } else {
        let emailToken = '';
        try {
          emailToken = await utils.generateEmailToken(
            userItem.email,
            userItem._id
          );
        } catch (e) {
          console.log(e);
        }
        // eslint-disable-next-line no-param-reassign
        userItem.emailToken = emailToken;
        userItem.save();

        responseHandler(res, 200, null, `Registration was successful.`, {
          newUser: { id: userItem._id, email: userItem.email }
        });

        /* Send verification link via nodemailer */
        const mailer = new Mailer(config, options);
        mailer.setMessage({
          email: userItem.email,
          link: verificationLink + emailToken
        });

        try {
          const mailerResponse = await mailer.sendMail();
          console.log(mailerResponse);
        } catch (e) {
          console.log(e);
        }
      }
    });
  },

  /**
   * Login an existing user
   */
  login: (req, res) => {
    /* Checking if email exists in database */
    userModel.findOne({ email: req.body.email }, async (err, user) => {
      if (err) {
        responseHandler(res, 500, err, 'Server Error', null);
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
  },

  verifyEmail: async (req, res) => {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.SECRET);
    try {
      const verifiedUser = await userModel.findOne(
        { email: decoded.email },
        { $set: { emailVerified: true } },
        { new: true }
      );

      responseHandler(res, 200, null, 'Email verified successfully', {
        user: verifiedUser._id
      });
    } catch (e) {
      responseHandler(res, 500, e, 'Email verified successfully', null);
      console.log(e);
    }
  }
};

export default authController;
