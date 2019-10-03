/* eslint-disable no-underscore-dangle */
/**
 *
 * FRIENDS CONTROLLER
 *
 */

import userModel from '../../../models/userSchema';
import responseHandler from '../../../utils/responseHandler';

let query = {};
let projection = {};
let update = {};

const friendsControllers = {
  /* Get all friends of a user */
  getAllFriends: async (req, res) => {
    const { userId } = req;
    query = { _id: userId };
    console.log(query);

    projection = { _id: 0, friends: 1 };
    try {
      await userModel.findOne(query, projection, (err, doc) => {
        try {
          if (err) {
            responseHandler(res, 500, err, 'Server error occurred', null);
            throw Error(err);
          } else if (!doc) {
            responseHandler(
              res,
              404,
              { name: 'userNotFound', errMsg: 'User Not Found' },
              'The user was not found',
              null
            );
            throw Error({ name: 'userNotFound', errMsg: 'User Not Found' });
          } else {
            const { friends } = doc;
            if (!friends.length) {
              responseHandler(
                res,
                204,
                { name: 'noFriendsFound', errMsg: 'No friends were found' },
                'The user has no friends',
                []
              );
              throw Error({
                name: 'noFriendsFound',
                errMsg: 'Friends were found'
              });
            } else {
              responseHandler(res, 200, null, 'Friends found', { friends });
            }
          }
        } catch (e) {
          console.log(`error: ${e.name}\nmessage: ${e.message}`);
        }
      });
    } catch (e) {
      // responseHandler(res, 500, e, 'Server Error Occurred', null);
      console.log(`error: ${e.name}\nmessage: ${e.message}`);
    }
  },

  /* Add friend (in both sender & receiver) */
  addFriend: async (req, res) => {
    const { fromUser, toUser } = req.body;
    query = { _id: { $in: [fromUser, toUser] } };
    projection = { _id: 1, email: 1, firstName: 1, lastName: 1, friends: 1 };
    try {
      await userModel.find(query, projection, async (err, docs) => {
        if (err) {
          responseHandler(res, 500, err, 'Server error', null);
          throw Error(err);
        } else if (!docs) {
          responseHandler(
            res,
            404,
            {
              name: 'usersNotFound',
              errMsg: 'Users not found'
            },
            null
          );
          throw Error({
            name: 'usersNotFound',
            errMsg: 'Users not found'
          });
        } else if (docs.length < 2) {
          responseHandler(
            res,
            404,
            {
              name: 'userPairNotFound',
              errMsg: 'One of the users was not found'
            },
            null
          );
          throw Error({
            name: 'userPairNotFound',
            errMsg: 'One of the users was not found'
          });
        } else {
          try {
            query = { _id: docs[0]._id };
            update = {
              $addToSet: {
                friends: {
                  _id: docs[1]._id,
                  email: docs[1].email,
                  fullName: `${docs[1].firstName} ${docs[1].lastName}`
                }
              }
            };
            await userModel.updateOne(query, update, (err1, doc1) => {
              if (err1) {
                console.log(`Error1: ${{ ...err1 }}`);
                throw Error({ ...err1 });
              } else {
                console.log(`Doc1: ${doc1}`);
              }
            });
          } catch (e) {
            throw Error(e);
          }
          try {
            query = { _id: docs[1]._id };
            update = {
              $addToSet: {
                friends: {
                  _id: docs[0]._id,
                  email: docs[0].email,
                  fullName: `${docs[0].firstName} ${docs[0].lastName}`
                }
              }
            };
            await userModel.updateOne(query, update, (err2, doc2) => {
              if (err2) {
                console.log(`Error2: ${{ ...err2 }}`);
                throw Error({ ...err2 });
              } else {
                console.log(`Doc2: ${doc2}`);
              }
            });
          } catch (e) {
            throw Error(e);
          }

          responseHandler(
            res,
            200,
            null,
            'Friends connected succesfully',
            null
          );
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  /* Remove a friend (delete connection in both sender & receiver) */
  /* NOT IN REQUIREMENTS - TODO LATER */
};

export default friendsControllers;
