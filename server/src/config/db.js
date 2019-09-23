import mongoose from 'mongoose';

const DB_INIT = async () => {
  let DB_URI = '';
  switch (process.env.NODE_ENV) {
    case 'development':
      // DB_URI = process.env.DB_LOCAL_URI;
      DB_URI = process.env.DB_CLOUD_URI;
      break;
    case 'production':
      DB_URI = process.env.DB_CLOUD_URI;
      break;
    default:
      // DB_URI = process.env.DB_LOCAL_URI;
      DB_URI = process.env.DB_CLOUD_URI;
  }

  mongoose.Promise = global.Promise;
  try {
    await mongoose.connect(DB_URI, { useNewUrlParser: true });
  } catch (e) {
    console.log(e);
  }
};

export default DB_INIT;
