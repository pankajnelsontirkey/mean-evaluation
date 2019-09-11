import mongoose from 'mongoose';

const DB_INIT = () => {
  let DB_URI = '';
  switch (process.env.NODE_ENV) {
    case 'development':
      DB_URI = process.env.DB_LOCAL_URI;
      break;
    case 'production':
      DB_URI = process.env.DB_CLOUD_URI;
      break;
    default:
      DB_URI = process.env.DB_LOCAL_URI;
  }

  mongoose.Promise = global.Promise;
  mongoose.connect(DB_URI, { useNewUrlParser: true });
};

export default DB_INIT;
