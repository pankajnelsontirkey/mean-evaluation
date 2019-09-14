/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */

import responseHandler from '../utils/responseHandler';
import userModel from '../models/userSchema';
import utils from '../utils/utils';
import Mailer from '../utils/nodemailer';

const authController = {
  /**
   *  Register a new user
   */
  register: async (req, res) => {
    try {
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
            throw Error(e);
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
              mailerResponseMessage += `Mail sent successfully to ${
                mailerResponse.accepted[0]
              } with messageId: ${mailerResponse.messageId} \n`;
            }
            if (mailerResponse.rejected.length) {
              mailerResponseMessage += `Sending mail failed to ${
                mailerResponse.rejected[0]
              } \n`;
            }
            console.log(mailerResponseMessage);
          } catch (e) {
            throw Error(e);
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Check Email Verification Token
   */
  verifyEmail: async (req, res) => {
    try {
      /*  */
      const { token } = req.params;
      if (!token) {
        throw Error({
          name: 'noTokenReceived',
          errMsg: 'No token found in parameters'
        });
      }
      /*  */
      const email = utils.checkEmailToken(token);

      try {
        const registeredUser = await userModel.findOne({ email });
        if (!registeredUser) {
          responseHandler(res, 200, null, 'Email not found.', {
            user: registeredUser._id
          });
          throw Error({
            name: 'emailNotFound',
            errMsg: 'Email not registered.'
          });
        }
        if (token !== registeredUser.token)
          try {
            registeredUser.emailVerified = true;
            registeredUser.emailToken = null;
            const verifiedUser = await registeredUser.save();
            console.log(
              `User with email ${verifiedUser.email} has a valid email.`
            );
            res.redirect(process.env.CLIENT_URL);
          } catch (e) {
            console.log(e);
            throw Error(e);
          }
      } catch (e) {
        console.log(e);
        responseHandler(res, 500, e, 'An error occurred while.', null);
      }
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Login an existing user
   */
  login: (req, res) => {
    userModel.findOne({ email: req.body.email }, async (err, user) => {
      try {
        /*  */
        if (err) {
          responseHandler(res, 500, err, 'Server Error', null);
          throw Error(err);
        }
        /*  */
        if (!user) {
          responseHandler(res, 404, null, 'Email not found', null);
          throw Error({ name: 'mailNotFound', errMsg: 'Email Not found' });
        }
        /* use model instance method to check password */
        if (!user.emailVerified) {
          responseHandler(
            res,
            401,
            {
              name: 'emailVerification',
              errMsg: 'Email has not been verified'
            },
            'Please check your mail for verification link.',
            null
          );
          throw Error({
            name: 'emailNotVerified',
            errMsg: 'Email has not been verified'
          });
        }
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
                name: 'Invalid Credentials',
                errMsg: 'Incorrect password'
              },
              'Incorrect Password was entered.',
              null
            );
            throw Error({
              name: 'badPassword',
              errMsg: 'Incorrect Password'
            });
          }

          try {
            const loginToken = await utils.generateLoginToken(
              user._id,
              user.role
            );
            if (!loginToken) {
              responseHandler(
                res,
                500,
                {
                  name: 'tokenError',
                  errMsg: 'Token could not be created.'
                },
                'Error creating login token',
                null
              );
              throw Error({
                name: 'tokenError',
                errMsg: 'Token could not be created.'
              });
            }
            responseHandler(res, 200, null, 'Logged in successfully', {
              userId: user._id,
              token: loginToken
            });
          } catch (e) {
            throw Error(e);
          }
        } catch (e) {
          throw Error(e);
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
};

export default authController;
