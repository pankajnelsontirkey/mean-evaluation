import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from './routes/auth/authRoutes';
/* import testRoutes from './routes/api/testRoutes'; */
import apiRoutes from './routes/api/v1/index';

export default class ExpressApp {
  constructor() {
    this.app = express();
    this.config();
  }

  config() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use('/', authRoutes);
    this.app.use('/api/v1', apiRoutes);
  }
}
