/**
 *
 * NOTIFICATIONS CONTROLLER
 *
 */

import userModel from '../../../models/userSchema';
import responseHandler from '../../../utils/responseHandler';

let query = {};
let projection = {};
let update = {};

const notificationsController = {
  /* Fetch notifications for a user */
  viewNotifications: async (req, res) => {
    const { userId } = req.body;
    query = { _id: userId };
    projection = { notifications: 1 };

    try {
      await userModel.findOne(query, projection, (err, doc) => {
        try {
          if (err) {
            responseHandler(res, 500, err, 'Server Error', null);
            throw Error(err);
          } else if (!doc) {
            responseHandler(
              res,
              500,
              { name: 'userNotFound', errMsg: 'User was not found' },
              'User was not found',
              null
            );
            throw Error({ name: 'userNotFound', errMsg: 'User was not found' });
          } else {
            const { notifications } = doc;
            if (!notifications.length) {
              responseHandler(
                res,
                204,
                {
                  name: 'noNotificationsFound',
                  errMsg: 'No notifications were found'
                },
                'No notifications were found',
                null
              );
              throw Error({
                name: 'noNotificationsFound',
                errMsg: 'No notifications were found'
              });
            } else {
              responseHandler(res, 200, null, 'Notifications found.', {
                notifications
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(`error: ${e.name.Error}\nmessage: ${{ ...e.message }}`);
    }
  },

  /* Save notifications to a user */
  addNotification: async (req, res) => {
    const { fromUser, toUser, type, data } = req.body;
    query = { toUser };
    update = { $addToSet: { notifications: { from: fromUser, type, data } } };
    try {
      await userModel.updateOne(query, update, (updateErr, doc) => {
        try {
          if (updateErr) {
            responseHandler(res, 500, updateErr, 'Server Error', null);
            throw Error(updateErr);
          } else if (!doc) {
            responseHandler(
              res,
              404,
              { name: 'userNotFound', errMsg: 'User not found' },
              'User not found',
              null
            );
            throw Error({ name: 'userNotFound', errMsg: 'User not found' });
          } else {
            responseHandler(res, 200, null, 'Notificaitons sent.', null);
          }
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  /* Remove notification from a user */
  // deleteNotification: async (req, res) => {}
};

export default notificationsController;
