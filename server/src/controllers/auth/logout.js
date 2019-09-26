/* eslint-disable no-underscore-dangle */
/**
 * LOGOUT USER
 * @param {*} req
 * @param {*} res
 */
import responseHandler from '../../utils/responseHandler';
import userModel from '../../models/userSchema';
import utils from '../../utils/utils';

const logout = async (req, res) => {
  const { loginToken } = req.params;
  const { _id } = utils.checkLoginToken(loginToken);
  try {
    await userModel.findOne(
      { _id },
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
        }
        try {
          await userModel.updateOne(
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
        } catch (e) {
          throw Error(e);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};
export default logout;
