/* eslint-disable new-cap */
import express from 'express';
import * as mongoose from 'mongoose';
import * as multer from 'multer';
import { Readable, Writable } from 'stream';

import GridFs from '../../../utils/gridfs';

const testRoutes = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadHandler = async (req, res) => {
  console.log(req.file.originalname);
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
};

const downloadHandler = async (req, res) => {
  const { fileId } = req.params;
  console.log(fileId);

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
        res.set('content-type', 'application/pdf');
        // res.set('accept-ranges', 'bytes');

        const downloadStream = bucket.openDownloadStream(
          mongoose.mongo.ObjectID(fileId)
        );

        downloadStream.on('data', chunk => {
          res.write(chunk);
        });

        downloadStream.on('error', () => {
          return res
            .status(404)
            .json({ message: 'Error while downloading file.' });
        });

        downloadStream.on('end', () => {
          return res
            .status(201)
            .json({ message: 'File downloaded successfully.' });
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
  const gfs = new GridFs();
  await gfs.initGridFs();
  try {
    gfs.createUploadStream(req.file);
    gfs.uploadFile(res);
  } catch (e) {
    console.log(e);
  }
};

const betterDownloadHandler = async (req, res) => {};

testRoutes.post(
  '/',
  upload.single('file'),
  uploadHandler /*  betterUploadHandler */
);

testRoutes.get('/:id', downloadHandler);

export default testRoutes;
