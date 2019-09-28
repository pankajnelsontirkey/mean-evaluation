import UserModel from '../../../models/userSchema';
import responsehandler from '../../../utils/responseHandler';

let query = {};
const projection = {};
let update = {};
let options = {};

const uploadsController = {
  uploadAvatar: async (req, res) => {
    const fileBuffer = req.file.buffer;
    query = { _id: '5d8c487a9c91080f8494f128' };
    update = { $set: { avatar: fileBuffer } };
    options = { upsert: true };
    try {
      await UserModel.updateOne(query, update, options, (err, doc) => {
        if (err) {
          responsehandler(res, 500, err, 'Server Error', null);
          throw Error(err);
        } else {
          responsehandler(res, 200, null, 'Avatar was saved.', null);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
  uploadFiles: async (req, res) => {
    res.send();
  }
};

export default uploadsController;
