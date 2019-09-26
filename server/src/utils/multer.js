import * as multer from 'multer';

class Multer {
  constructor(options) {
    this.upload = multer(options);
  }
}

export const avatarUploader = new Multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
      return cb(new Error('Please upload an image'));
    }
    return cb(undefined, true);
  }
});

export const fileUploader = new Multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
      return cb(new Error('Please upload a doc, docx or pdf file.'));
    }
    return cb(undefined, true);
    // cb(new Error('File must be a pdf'));
    // cb(undefined, true);
    // cb(undefined, false);
  }
});
