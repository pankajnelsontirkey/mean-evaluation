import UserModel from '../../../models/userSchema';
import responsehandler from '../../../utils/responseHandler';

let query = {};
// const projection = {};
let update = {};
let options = {};

const uploadsController = {
  uploadAvatar: async (req, res) => {
    const fileBuffer = req.file.buffer;
    const { userId } = req;

    options = { upsert: true };
    query = { _id: userId };
    /* Replace with gridFs upload methods */
    update = { $set: { avatar: fileBuffer } };

    try {
      await UserModel.updateOne(query, update, options, (err, doc) => {
        if (err) {
          responsehandler(res, 500, err, 'Server Error', null);
          throw Error({ name: err.name, message: err.message });
        } else {
          responsehandler(res, 200, null, 'Avatar was saved.', null);
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  },
  uploadFiles: /* async */ (req, res) => {
    try {
      console.log(req.file);

      // const result = await saveFileToDB.gfs.openUploadStream(
      //   req.file.originalname
      // );
      // console.log(result);
      // saveFileToDB.close();
      // if (saveFileToDB) {
      //   res.send(`Testing...`);
      // } else {
      //   res.send(`no handle`);
      // }
    } catch (e) {
      console.log(e);
    }
  }
};

export default uploadsController;
