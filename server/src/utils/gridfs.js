import * as mongoose from 'mongoose';
import { Readable, Writable } from 'stream';

class GridFs {
  constructor() {
    this.DB_URL = process.env.DB_URL;
    this.DB_NAME = process.env.DB_NAME;
    this.DB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
    this.BUCKET_OPTIONS = { bucketName: 'files' };
    this.initGridFs();
  }

  async initGridFs() {
    await this.connectToDb();
    this.createBucket();
  }

  async connectToDb() {
    try {
      this.dbHandle = await mongoose.createConnection(this.DB_URL, {
        ...this.DB_OPTIONS,
        dbName: this.DB_NAME
      });
    } catch (e) {
      console.log(`[gridFs.js][connectToDb]: ${e}`);
    }
  }

  createBucket() {
    try {
      this.gfsBucket = new mongoose.mongo.GridFSBucket(
        this.dbHandle.db,
        this.BUCKET_OPTIONS
      );
    } catch (e) {
      console.log(e);
    }
  }

  createUploadStream(file) {
    try {
      console.log(file.buffer);

      this.readable = new Readable();
      this.readable.push(file.buffer);
      this.uploadStream = this.gfsBucket.openUploadStream(file.originalname);
    } catch (e) {
      console.log(`createUploadStream error`, e);
    }
  }

  createDownloadStream(filename) {
    this.writable = new Writable();
    try {
      this.downloadStream = this.gfsBucket.openDownloadStream(filename);
    } catch (e) {
      console.log(e);
    }
  }

  uploadFile(res) {
    try {
      this.readable.pipe(this.uploadStream);

      this.uploadStream.on('error', () => {
        return res.status(500).json({ message: 'Error uploading file.' });
      });

      this.uploadStream.on('finish', () => {
        return res.status(201).json({ message: 'File uploaded successfully.' });
      });
    } catch (e) {
      console.log(`uploadFile error`, e);
    }
  }

  // downloadFile(res) {}
}

export default GridFs;
