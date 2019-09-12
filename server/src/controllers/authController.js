/* eslint-disable new-cap */
/* eslint-disable no-underscore-dangle */
import * as jwt from 'jsonwebtoken';

import responseHandler from '../utils/responseHandler';
import userModel from '../models/userSchema';
import utils from '../utils/utils';
import Mailer from '../utils/nodemailer';

const authController = {
  /**
   *  Signup a new user
   */
  signup: async (req, res) => {
    const passwordHash = await utils.bcryptGenerateHash(req.body.password);
    const userObj = { ...req.body, password: passwordHash };

    userModel.create(userObj, async (err, userItem) => {
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

        userModel.updateOne({ _id: userItem._id }, { password: emailToken });

        responseHandler(res, 200, null, `Registration was successful.`, {
          newUser: { id: userItem._id, email: userItem.email }
        });

        /* Send verification link via nodemailer */
        try {
          const mailer = new Mailer();
          mailer.setOptions({
            email: userItem.email,
            token: emailToken
          });
          const mailerResponse = await mailer.sendMail();
          let mailerResponseMessage = '';
          if (mailerResponse.accepted.length) {
            mailerResponseMessage = `Mail sent successfully to ${
              mailerResponse.accepted[0]
            } with messageId: ${mailerResponse.messageId}`;
            console.log(mailerResponseMessage);
          }
          if (mailerResponse.rejected.length) {
            mailerResponseMessage = `Sending mail failed to ${
              mailerResponse.rejected[0]
            }`;
            console.log(mailerResponseMessage);
          }
          /* console.log(
            `Mail sent successfully to ${mailerResponse.envelope.to}`
          ); */
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
    userModel.findOne({ email: req.body.email }, async (err, user) => {
      if (err) {
        responseHandler(res, 500, err, 'Server Error', null);
      }
      if (!user) {
        responseHandler(res, 404, null, 'Email not found', null);
      }

      /* use model instance method to check password */
      if (!user.emailVerified) {
        responseHandler(
          res,
          401,
          {
            errName: 'emailVerification',
            errMsg: 'Email has not been verified'
          },
          'Please check your mail for verification link.',
          null
        );
      } else {
        try {
          const passwordMatch = await utils.bcryptVerifyHash(
            req.body.password,
            user.password
          );
          if (!passwordMatch) {
            responseHandler(
              res,
              401,
              {
                errName: 'Invalid Credentials',
                errMsg: 'Incorrect password'
              },
              'Incorrect Password was entered.',
              null
            );
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
      }
    });
  },

  verifyEmail: async (req, res) => {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.SECRET);
    try {
      const registeredUser = await userModel.findOne({ email: decoded.email });
      if (!registeredUser) {
        responseHandler(res, 200, null, 'Email not found.', {
          user: registeredUser._id
        });
      } else {
        try {
          registeredUser.emailVerified = true;
          registeredUser.emailToken = null;
          const verifiedUser = await registeredUser.save();
          console.log(`User with email ${verifiedUser} has a valid email.`);
          res.redirect('http://localhost:4200');
        } catch (e) {
          console.log(e);
          throw Error(e);
        }
      }
    } catch (e) {
      console.log(e);
      responseHandler(
        res,
        500,
        e,
        'An error occurred while trying verification.',
        null
      );
    }
  }
};

export default authController;
