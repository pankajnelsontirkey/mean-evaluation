import express from 'express';

import { avatarUploader, fileUploader } from '../../../utils/multer';
import uploadsController from '../../../controllers/api/v1/uploadsController';

const uploadRoutes = express.Router();

uploadRoutes.post(
  '/avatar',
  avatarUploader.upload.single('avatar'),
  uploadsController.uploadAvatar,
  async (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

uploadRoutes.post(
  '/file',
  fileUploader.upload.single('file'),
  uploadsController.uploadFiles,
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

export default uploadRoutes;
