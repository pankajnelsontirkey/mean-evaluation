const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Routes = require('./routes/route');
const DB_URI = process.env.DB_LOCAL_URI;

module.exports = class ExpressApp {
  constructor() {
    this.app = express();
    this.configMiddlewares();
    this.configRoutes();
    this.configDb(DB_URI);
  }

  /* Initialize middlewares */
  configMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    require('./auth/auth');
  }

  /* config new routes here */
  configRoutes() {
    this.app.use('/api/v1', Routes);
  }

  configErrorHandler() {
    this.app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({ error: err });
    });
  }

  /* DB setup */
  configDb(uri) {
    mongoose.Promise = global.Promise;
    mongoose.connect(uri, { useNewUrlParser: true });
  }
};
