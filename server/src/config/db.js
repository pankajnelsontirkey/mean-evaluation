import mongoose from 'mongoose';

export default class DBConfig {
  constructor() {
    this.setConnectionString();
    this.setOptions();
  }

  setConnectionString() {
    /* NOTE: using same db currently for dev & prod modes */
    switch (process.env.NODE_ENV) {
      case 'development':
        // this.DB_URL = process.env.DB_LOCAL_URI;
        this.DB_URL = process.env.DB_CLOUD_URI;
        break;
      case 'production':
        this.DB_URL = process.env.DB_CLOUD_URI;
        break;
      default:
        // this.DB_URL = process.env.DB_LOCAL_URI;
        this.DB_URL = process.env.DB_CLOUD_URI;
    }
  }

  setOptions() {
    this.DB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
  }

  async DB_INIT() {
    mongoose.Promise = global.Promise;

    try {
      await mongoose.connect(this.DB_URL, this.DB_OPTIONS);
    } catch (e) {
      console.log(`[mongoose.connect][error]: ${e.name} ${e.message} `);
    }
  }
}
