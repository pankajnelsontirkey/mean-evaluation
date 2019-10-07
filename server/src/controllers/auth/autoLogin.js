/* eslint-disable no-underscore-dangle */
/**
 * AUTOLOGIN
 * @param {*} req
 * @param {*} res
 */

import responseHandler from '../../utils/responseHandler';
import userModel from '../../models/userSchema';
import utils from '../../utils/utils';

const autoLogin = async (req, res) => {
  try {
    const { loginToken } = req.params;
    const tokenResponse = utils.checkLoginToken(loginToken);

    if (tokenResponse.error) {
      return responseHandler(
        res,
        401,
        tokenResponse.error,
        'Error with token',
        null
      );
    } else {
      try {
        await userModel.findOne(
          { _id },
          { loginToken: 1, role: 1, email: 1, isLoggedIn: 1 },
          (err, user) => {
            if (err) {
              responseHandler(res, 500, err, 'Server Error', null);
              throw Error(err);
            } else if (!user) {
              responseHandler(
                res,
                404,
                {
                  name: 'noUserFound',
                  errMsg: 'User does not exist'
                },
                'User not found',
                null
              );
              throw Error({
                name: 'noUserFound',
                errMsg: 'User does not exist'
              });
            } else if (!user.isLoggedIn) {
              responseHandler(
                res,
                404,
                {
                  name: 'isLoggedOut',
                  errMsg: 'This user has been logged out.'
                },
                '',
                null
              );

              throw Error({
                name: 'isLoggedOut',
                errMsg: 'This user has been logged out.'
              });
            } else if (!user.loginToken) {
              responseHandler(
                res,
                404,
                {
                  name: 'noTokenFound',
                  errMsg: 'Token not found'
                },
                'User token not found',
                null
              );
              throw Error({
                name: 'noTokenFound',
                errMsg: 'Token not found'
              });
            } else if (loginToken !== user.loginToken) {
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
              responseHandler(res, 200, null, 'User found.', {
                userId: user._id,
                loginToken: user.loginToken,
                role: user.role,
                email: user.email
              });
            }
          }
        );
      } catch (e) {
        console.log(e);
        for (item in Object.keys(e)) {
          console.log(e.item);
        }
        throw Error(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export default autoLogin;
