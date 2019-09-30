/* eslint-disable new-cap */
import express from 'express';

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
        console.log(readable);

        const uploadStream = bucket.openUploadStream(req.file.originalname);
        const result = readable.pipe(uploadStream);
        console.log(result);

        res.send(`Testing`);
        /* uploadStream.on('error', () => {
          return res.status(500).json({ message: 'Error uploading file.' });
        });

        uploadStream.on('finish', () => {
          return res
            .status(201)
            .json({ message: 'File uploaded successfully.' });
        }); */
      });
  } catch (e) {
    console.log(`[catchBlock]`, e);
  }
};

testRoutes.post('', upload.single('file'), testHandler);

export default testRoutes;
