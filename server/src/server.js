/* eslint-disable import/first */
import { config } from 'dotenv';
import ExpressApp from './expressApp';
import DBConfig from './config/db';

class Server {
  constructor() {
    config();
    this.dbObj = new DBConfig();
  }

  init() {
    this.dbObj.DB_INIT();
    this.App = new ExpressApp().app;
    this.PORT = process.env.PORT;

    try {
      this.App.listen(this.PORT, () => {
        console.log(`Server is listening on port: ${this.PORT}`);
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const server = new Server();

server.init();
