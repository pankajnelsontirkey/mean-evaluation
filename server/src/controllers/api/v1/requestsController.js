/**
 *
 * REQUESTS CONTROLLER
 *  friendRequest, shareRequest
 *
 */
import userModel from '../../../models/userSchema';
import responseHandler from '../../../utils/responseHandler';

let query = {};
let projection = {};
let update = {};

const requestsController = {
  addRequest: async (req, res) => {
    const { fromUser, toUser, data } = req.body;

    query = { _id: { $in: [toUser, fromUser] } };
    projection = { friends: 1, requests: 1, notifications: 1 };
    try {
      await userModel.find(query, projection, async (err, docs) => {
        if (err) {
          responseHandler(res, 500, err, 'Server error', null);
          throw Error;
        } else if (!docs || !docs.length || docs.length < 2) {
          responseHandler(
            res,
            404,
            { name: 'userNotFound', errMsg: 'No users found' },
            null
          );
          throw Error({ name: 'userNotFound', errMsg: 'No users found' });
        } else {
          try {
            query = { _id: fromUser };
            update = { $addToSet: { requests: data } };
            await userModel.updateOne(query, update, (updateErr, doc) => {
              if (updateErr) {
                responseHandler(res, 500, updateErr, 'Server Error', null);
                throw Error(updateErr);
              } else if (!doc) {
                responseHandler(res, 404, {
                  name: 'userNotFound',
                  errMsg: 'User not found'
                });
                throw Error({
                  name: 'userNotFound',
                  errMsg: 'User not found'
                });
              } else {
                responseHandler(
                  res,
                  200,
                  null,
                  'Request sent to receiver',
                  null
                );
              }
            });
          } catch (e) {
            console.log(e);
          }
          responseHandler(res, 200, null, 'Test response', null);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
  viewRequests: async (req, res) => {
    const { userId } = req.body.params;
    query = { _id: userId };
    projection = { requests: 1 };

    try {
      userModel.find(query, projection, (err, doc) => {
        if (err) {
          responseHandler(res, 500, err, 'Server Error', null);
          throw Error(err);
        } else if (!doc) {
          responseHandler(
            res,
            404,
            { name: 'userNotFound', errMsg: 'User was not found' },
            null
          );
          throw Error({ name: 'userNotFound', errMsg: 'User was not found' });
        } else {
          const { requests } = doc[0];
          if (!requests.length) {
            responseHandler(res, 204, {
              name: 'noRequestsFound',
              errMsg: 'No requests were found'
            });
            throw Error({
              name: 'noRequestsFound',
              errMsg: 'No requests were found'
            });
          } else {
            responseHandler(res, 200, null, 'Requests found', { requests });
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  },

  deleteRequest: async (req, res) => {}
};

export default requestsController;
