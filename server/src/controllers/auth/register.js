/* eslint-disable no-underscore-dangle */
/**
 * REGISTER USER
 * @param {*} req
 * @param {*} res
 */

import responseHandler from '../../utils/responseHandler';
import userModel from '../../models/userSchema';
import utils from '../../utils/utils';
import Mailer from '../../utils/nodemailer';

const register = async (req, res) => {
  try {
    const passwordHash = await utils.bcryptGenerateHash(req.body.password);

    const userObj = {
      ...req.body,
      password: passwordHash,
      avatar: req.file.buffer
    };

    let resMsg = '';

    await userModel.create(userObj, async (err, userItem) => {
      if (err || !userItem) {
        resMsg += 'Registration failed';
        responseHandler(res, 500, err, resMsg, null);
        throw Error(err);
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
          await userModel.updateOne(
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
          // const mailerResponse = await mailer.sendMail();
          // let mailerResponseMessage = '';
          // if (mailerResponse.accepted.length) {
          //   mailerResponseMessage += `Mail sent successfully to ${mailerResponse.accepted} with messageId: ${mailerResponse.messageId} \n`;
          //   resMsg += ` Check email for verification link`;
          // }
          // if (mailerResponse.rejected.length) {
          //   mailerResponseMessage += `Sending mail failed to ${mailerResponse.rejected} \n`;
          // }
          // console.log(mailerResponseMessage);
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
};

export default register;
