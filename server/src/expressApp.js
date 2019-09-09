import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import testRoutes from './routes/api/testRoutes';
import authRoutes from './routes/authRoutes';

export class ExpressApp {
  constructor() {
    this.app = express();
    this.config();
  }

  config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use('/', authRoutes);
    this.app.use('/api/v1', testRoutes);
  }
}
