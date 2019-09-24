/**
 *
 * FRIENDS CONTROLLER
 *
 */

import userModel from '../../../models/userSchema';
import responseHandler from '../../../utils/responseHandler';

let query = {};
let projection = {};

const friendsControllers = {
  /* Get all friends of a user */
  getAllFriends: async (req, res) => {
    const userId = req.body.sender;
    query = { _id: userId };
    projection = { _id: 0, friends: 1 };
    try {
      await userModel.find({ query }, { projection }, (err, docs) => {
        if (err) {
          responseHandler(res, 500, err, 'Server error occurred', null);
          throw Error(err);
        } else if (!docs) {
          responseHandler(
            res,
            404,
            {
              name: 'userNotFound',
              errMsg: 'User Not Found'
            },
            'The user was not found',
            null
          );
          throw Error({
            name: 'userNotFound',
            errMsg: 'User Not Found'
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
};
