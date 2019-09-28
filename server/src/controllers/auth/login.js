/* eslint-disable no-underscore-dangle */
/**
 * LOGIN USER
 * @param {*} req
 * @param {*} res
 */

import responseHandler from '../../utils/responseHandler';
import userModel from '../../models/userSchema';
import utils from '../../utils/utils';

const login = async (req, res) => {
  try {
    await userModel.findOne(
      { email: req.body.email },
      { _id: 1, emailVerified: 1, password: 1, role: 1, email: 1 },
      async (err, user) => {
        if (err) {
          responseHandler(res, 500, err, 'Server Error', null);
          throw Error(err);
        } else if (!user) {
          /* Handle error when email id not found in db */
          responseHandler(res, 404, null, 'Email not found', null);
          throw Error({ name: 'mailNotFound', errMsg: 'Email Not found' });
        } else if (!user.emailVerified) {
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
                          responseHandler(res, 500, updateErr, '', null);
                          throw Error(updateErr);
                        } else {
                          responseHandler(
                            res,
                            200,
                            null,
                            'Logged in successfully',
                            {
                              userId: user._id,
                              loginToken,
                              role: user.role,
                              email: user.email
                            }
                          );
                        }
                      }
                    );
                  } catch (e) {
                    throw Error(e);
                  }
                }
              } catch (e) {
                throw Error(e);
              }
            }
          } catch (e) {
            throw Error(e);
          }
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export default login;
