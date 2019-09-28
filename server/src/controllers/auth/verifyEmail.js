/* eslint-disable no-underscore-dangle */
/**
 * VERIFY EMAIL
 * @param {*} req
 * @param {*} res
 */

import responseHandler from '../../utils/responseHandler';
import userModel from '../../models/userSchema';
import utils from '../../utils/utils';

const verifyEmail = async (req, res) => {
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
};

export default verifyEmail;
