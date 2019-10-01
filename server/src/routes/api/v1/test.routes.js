/* eslint-disable new-cap */
import express from 'express';
import * as mongoose from 'mongoose';
import * as multer from 'multer';
import { Readable, Writable } from 'stream';

import GridFs from '../../../utils/gridfs';
import responseHandler from '../../../utils/responseHandler';

const testRoutes = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadHandler = async (req, res) => {
  if (req.file) {
    console.log(req.file);
    const readable = new Readable();
    readable.push(req.file.buffer);
    readable.push(null);
    try {
      mongoose
        .createConnection(process.env.DB_URL, {
          dbName: process.env.DB_NAME,
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then(conn => {
          const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'files'
          });
          return bucket;
        })
        .then(bucket => {
          const uploadStream = bucket.openUploadStream(req.file.originalname);
          readable.pipe(uploadStream);

          uploadStream.on('error', () => {
            return res.status(500).json({ message: 'Error uploading file.' });
          });

          uploadStream.on('finish', () => {
            return res
              .status(201)
              .json({ message: 'File uploaded successfully.' });
          });
        });
    } catch (e) {
      console.log(`[catchBlock]`, e);
    }
  } else {
    responseHandler(
      res,
      400,
      {
        name: 'noFileSelected',
        message: 'No file(s) was received for upload'
      },
      null
    );
  }
};

const downloadHandler = async (req, res) => {
  const fileId = mongoose.mongo.ObjectID(req.params.fileId);

  try {
    mongoose
      .createConnection(process.env.DB_URL, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(conn => {
        const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
          bucketName: 'files'
        });
        return bucket;
      })
      .then(bucket => {
        const downloadStream = bucket.openDownloadStream(fileId);

        downloadStream.on('data', chunk => {
          console.log('Found a chunk');
          res.write(chunk);
        });

        downloadStream.on('end', () => {
          res.end();
        });

        downloadStream.on('error', () => {
          return res
            .status(404)
            .json({ message: 'Error while downloading file.' });
        });
      })
      .catch(e => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
  }
};

const betterUploadHandler = async (req, res) => {
  /* fieldname, originalname, encoding, mimetype: 'video/mp4', size */

  const gfsBucket = new GridFs();
  await gfsBucket.initGridFs();
  try {
    const uploadStream = gfsBucket.createUploadStream(req.file);
    gfsBucket.uploadFile(uploadStream);
  } catch (e) {
    console.log(e);
  }
  responseHandler(res, 200, null, 'Testing', null);
};

const betterDownloadHandler = async (req, res) => {};

testRoutes.post(
  '/',
  upload.single('file'),
  /* uploadHandler */ betterUploadHandler
);

testRoutes.get('/:fileId', downloadHandler /* betterDownloadHandler */);

export default testRoutes;
