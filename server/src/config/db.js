import mongoose from 'mongoose';

let DB_URI;

export const DB_INIT = DB_URI => {
  switch (process.env.NODE_ENV) {
    case 'development':
      DB_URI = process.env.DB_LOCAL_URI;
      break;
    case 'production':
      DB_URI = process.env.DB_CLOUD_URI;
      break;
  }

  console.log(DB_URI);

  mongoose.Promise = global.Promise;
  // mongoose.connect(DB_URI, { useNewUrlParser: true });
};
