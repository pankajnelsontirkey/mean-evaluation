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
      let resMsg = '';

      userModel.create(userObj, async (err, userItem) => {
        if (err || !userItem) {
          resMsg += 'Registration failed';
          responseHandler(res, 500, err, resMsg, null);
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

          try {
            userModel.updateOne(
              { _id: userItem._id },
              { emailToken },
              (updateErr, updateRes) => {
                if (updateErr) {
                  throw Error(updateErr);
                } else {
                  resMsg += `Registration was successful.`;
                }
              }
            );
          } catch (e) {
            throw Error(e);
          }

          /* Send verification link via nodemailer */
          try {
            const mailer = new Mailer();
            mailer.setOptions({
              email: userItem.email,
              emailToken
            });
            const mailerResponse = await mailer.sendMail();
            let mailerResponseMessage = '';
            if (mailerResponse.accepted.length) {
              mailerResponseMessage += `Mail sent successfully to ${mailerResponse.accepted} with messageId: ${mailerResponse.messageId} \n`;
              resMsg += ` Check email for verification link`;
            }
            if (mailerResponse.rejected.length) {
              mailerResponseMessage += `Sending mail failed to ${mailerResponse.rejected} \n`;
            }
            console.log(mailerResponseMessage);
          } catch (e) {
            throw Error(e);
          }

          responseHandler(res, 200, null, resMsg, {
            newUser: { id: userItem._id, email: userItem.email }
          });
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
      let { emailToken } = req.params;
      emailToken = emailToken.split(' ').join('');

      if (!emailToken || emailToken === '') {
        responseHandler(
          res,
          400,
          { name: 'noTokenReceived', errMsg: 'No token found in parameters' },
          'Token not received.',
          null
        );
        throw Error({
          name: 'noTokenReceived',
          errMsg: 'No token found in parameters'
        });
      } else {
        /*  */
        const email = utils.checkEmailToken(emailToken);

        try {
          const registeredUser = await userModel.findOne({ email });
          if (!registeredUser) {
            responseHandler(res, 404, null, 'Email not found.', {
              user: registeredUser._id
            });
            throw Error({
              name: 'emailNotFound',
              errMsg: 'Email not registered.'
            });
          } else if (emailToken !== registeredUser.emailToken) {
            responseHandler(
              res,
              400,
              {
                name: 'tokenMismatch',
                errMsg: 'Token does not match current user.'
              },
              'Invalid token received',
              null
            );
            throw Error({
              name: 'tokenMismatch',
              errMsg: 'Token does not belong to current user.'
            });
          } else {
            try {
              registeredUser.emailVerified = true;
              registeredUser.emailToken = null;
              const verifiedUser = await registeredUser.save();
              if (!verifiedUser) {
                responseHandler(
                  res,
                  500,
                  {
                    name: 'Error verifying email.',
                    errMsg: 'emailVerified could not be updated.'
                  },
                  null
                );
                throw Error({
                  name: 'Error setting emailVerified.',
                  errMsg: 'emailVerified could not be updated.'
                });
              } else {
                /* SUCCESS */
                res.status(200).redirect(process.env.CLIENT_URL);
              }
            } catch (e) {
              responseHandler(res, 500, e, 'An error was encountered.', null);
              throw Error(e);
            }
          }
        } catch (e) {
          responseHandler(
            res,
            500,
            e,
            'An error occurred was encountered.',
            null
          );
          throw Error(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Login an existing user
   */
  login: async (req, res) => {
    try {
      await userModel.findOne({ email: req.body.email }, async (err, user) => {
        try {
          /* Handle error from mongodb server */
          if (err) {
            responseHandler(res, 500, err, 'Server Error', null);
            throw Error(err);
          } else if (!user) {
            /* Handle error when email id not found in db */
            responseHandler(res, 404, null, 'Email not found', null);
            throw Error({ name: 'mailNotFound', errMsg: 'Email Not found' });
          } else if (!user.emailVerified) {
            /* use model instance method to check password */
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
              } else {
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
                  } else {
                    try {
                      userModel.updateOne(
                        { _id: user._id },
                        { isLoggedIn: true, loginToken },
                        (updateErr, updateRes) => {
                          if (updateErr) {
                            throw Error(updateErr);
                          }
                          responseHandler(res, 500, updateErr, '', null);
                        }
                      );
                    } catch (e) {
                      throw Error(e);
                    }
                    responseHandler(res, 200, null, 'Logged in successfully', {
                      userId: user._id,
                      loginToken,
                      email: user.email
                    });
                  }
                } catch (e) {
                  throw Error(e);
                }
              }
            } catch (e) {
              throw Error(e);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },

  getLoginByUserId: async (req, res) => {
    const { loginToken } = req.params;
    const { _id } = utils.checkLoginToken(loginToken);

    try {
      await userModel.findOne(
        { _id },
        { _id: 1, loginToken: 1, role: 1, email: 1 },
        (err, doc) => {
          if (err) {
            responseHandler(res, 500, err, 'Server Error', null);
            throw Error(err);
          } else if (!doc) {
            responseHandler(res, 404, null, 'User not found', null);
            throw Error({
              name: 'noUserExists',
              errMsg: 'User does not exist'
            });
          } else if (!doc.loginToken) {
            responseHandler(res, 404, null, 'User token not found', null);
            throw Error({
              name: 'noTokenFound',
              errMsg: 'Token not found'
            });
          } else if (loginToken !== doc.loginToken) {
            responseHandler(
              res,
              401,
              { name: 'tokenMismatch', errMsg: 'Login token is invalid' },
              'User found, but token invalid',
              null
            );
            throw Error({
              name: 'tokenMismatch',
              errMsg: 'Login token is invalid'
            });
          } else {
            responseHandler(res, 200, null, 'User found, sending role', {
              userId: doc._id,
              loginToken: doc.loginToken,
              role: doc.role,
              email: doc.email
            });
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  },

  logout: async (req, res) => {
    const { id } = req.params;
    try {
      await userModel.findOne(
        { _id: id },
        { isLoggedIn: 1, loginToken: 1 },
        async (err, user) => {
          if (err) {
            responseHandler(res, 500, err, 'Server error', null);
            throw Error(err);
          } else if (!user) {
            responseHandler(
              res,
              404,
              {
                name: 'noUserExists',
                errMsg: 'No user found'
              },
              'No user found.',
              null
            );
            throw Error({
              name: 'noUserExists',
              errMsg: 'No user found'
            });
          } else if (!user.isLoggedIn && !user.loginToken) {
            responseHandler(
              res,
              400,
              {
                name: 'badRequest',
                errMsg: 'Not logged in.'
              },
              null
            );
            throw Error({
              name: 'badRequest',
              errMsg: 'Not logged in.'
            });
          } else {
            await userModel.update(
              { _id: user._id },
              { isLoggedIn: false, loginToken: null },
              (updateErr, updatedUser) => {
                if (updateErr) {
                  responseHandler(
                    res,
                    500,
                    updateErr,
                    'Server Error while updating user',
                    null
                  );
                  throw Error(updateErr);
                } else {
                  responseHandler(
                    res,
                    200,
                    null,
                    'User has been logged out',
                    null
                  );
                }
              }
            );
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
};

export default authController;
