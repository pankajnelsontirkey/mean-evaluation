/**
 *
 * USERS CONTROLLER
 *
 */

import userModel from '../../../models/userSchema';
import responseHandler from '../../../utils/responseHandler';

let query = {};
const projection = { _id: 0, email: 1, firstName: 1, lastName: 1, avatar: 1 };

const usersController = {
  /* GET all users registered on platform */
  getAllUsers: async (req, res) => {
    try {
      await userModel.find(query, projection, (err, docs) => {
        if (err) {
          responseHandler(res, 500, err, 'Database error', null);
          throw Error(err);
        } else if (!docs) {
          responseHandler(
            res,
            404,
            {
              name: 'noUsers',
              errMsg: 'No users in database'
            },
            'No users found',
            null
          );
          throw Error({
            name: 'noUsers',
            errMsg: 'No users in database'
          });
        } else {
          responseHandler(res, 200, null, 'Found users.', docs);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },

  searchUser: async (req, res) => {
    const { searchText } = req.params;
    query = { $text: { $search: searchText, $caseSensitive: false } };

    try {
      await userModel.find(query, projection, (err, docs) => {
        if (err) {
          responseHandler(res, 500, err, 'Database error', null);
          throw Error(err);
        } else if (!docs) {
          responseHandler(
            res,
            404,
            {
              name: 'noUsers',
              errMsg: 'No users in database'
            },
            'No users found',
            null
          );
          throw Error({
            name: 'noUsers',
            errMsg: 'No users in database'
          });
        } else {
          responseHandler(res, 200, null, 'Found users.', docs);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
};

export default usersController;
