/* eslint-disable new-cap */
import express from 'express';
import { MongoClient, GridFSBucket } from 'mongodb';
import * as mongoose from 'mongoose';
import * as multer from 'multer';
import { Readable } from 'stream';

const testRoutes = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const testHandler = async (req, res) => {
  console.log(req.file.originalname);
  const readable = new Readable();
  readable.push(req.file.buffer);
  readable.push(null);
  try {
    const conn = await mongoose.connect(process.env.DB_CLOUD_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    try {
      const bucket = await mongoose.mongo.GridFSBucket(conn, {
        bucketName: 'files'
      });

      try {
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
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
};

testRoutes.post(
  '',
  upload.single('file', (req, res, err, next) => {
    if (err) {
      console.log(err);
      res.status(400).send('Error');
    }
    next();
  }),
  testHandler
);

export default testRoutes;
