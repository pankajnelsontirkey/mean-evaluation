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
      if (this.dbHandle) {
        console.log(`Connected to db for upload...`);
      }
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
    this.readable = new Readable();
    this.readable.push(file.buffer);
    try {
      return this.gfsBucket.openUploadStream(file.originalname);
    } catch (e) {
      console.log(`createUploadStream error`, e);
      throw Error(e);
    }
  }

  uploadFile(uploadStream) {
    try {
      this.readable.pipe(uploadStream);
      uploadStream.on('error', () => {
        throw Error('Upload error');
      });
      uploadStream.on('finish', () => {
        console.log(`Finish`);
      });
    } catch (e) {
      console.log(`uploadFile error`, e);
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

  // downloadFile(res) {}
}

export default GridFs;
