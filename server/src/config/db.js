const mongoose = require('mongoose');

// const DB_URI = process.env.DB_LOCAL_URI;
const DB_URI = 'mongodb://localhost:27017/evaluation';

const DB_INIT = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(DB_URI, { useNewUrlParser: true });
};

module.exports = { DB_INIT };
