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
  /* Fetch requests for a user */
  viewRequests: async (req, res) => {
    const { userId } = req.body;
    query = { _id: userId };
    projection = { requests: 1 };

    try {
      await userModel.findOne(query, projection, (err, doc) => {
        try {
          if (err) {
            responseHandler(res, 500, err, 'Server Error', null);
            throw Error(err);
          } else if (!doc) {
            responseHandler(
              res,
              404,
              { name: 'userNotFound', errMsg: 'User was not found' },
              'User was not found',
              null
            );
            throw Error({ name: 'userNotFound', errMsg: 'User was not found' });
          } else {
            const { requests } = doc;
            if (!requests.length) {
              responseHandler(
                res,
                204,
                { name: 'noRequestsFound', errMsg: 'No requests were found' },
                'No requests were found',
                null
              );
              throw Error({
                name: 'noRequestsFound',
                errMsg: 'No requests were found'
              });
            } else {
              responseHandler(res, 200, null, 'Requests found', { requests });
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

  /* Save requests to a user */
  addRequest: async (req, res) => {
    const { fromUser, toUser, type, data } = req.body;
    query = { _id: { $in: [toUser, fromUser] } };
    projection = { friends: 1, requests: 1, notifications: 1 };
    try {
      await userModel.find(query, projection, async (err, docs) => {
        if (err) {
          responseHandler(res, 500, err, 'Server error', null);
          throw Error(err);
        } else if (!docs || !docs.length || docs.length < 2) {
          responseHandler(
            res,
            404,
            { name: 'userNotFound', errMsg: 'No users found' },
            'User was not found',
            null
          );
          throw Error({
            name: 'userNotFound',
            errMsg: 'Either/both users found'
          });
        } else {
          try {
            query = { _id: toUser };
            update = {
              $addToSet: { requests: { from: fromUser, type, data } }
            };
            await userModel.updateOne(query, update, (updateErr, doc) => {
              if (updateErr) {
                responseHandler(res, 500, updateErr, 'Server Error', null);
                throw Error(updateErr);
              } else if (!doc) {
                responseHandler(
                  res,
                  404,
                  { name: 'userNotFound', errMsg: 'User not found' },
                  'User was not found',
                  null
                );
                throw Error({ name: 'userNotFound', errMsg: 'User not found' });
              } else {
                responseHandler(res, 200, null, 'Request sent.', null);
              }
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  /*  */
  // deleteRequest: async (req, res) => {}
};

export default requestsController;
