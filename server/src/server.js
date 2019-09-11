import { config } from 'dotenv';

config();

// eslint-disable-next-line import/first
import ExpressApp from './expressApp';
// eslint-disable-next-line import/first
import DB_INIT from './config/db';

const App = new ExpressApp().app;
// eslint-disable-next-line prefer-destructuring
const PORT = process.env.PORT;

DB_INIT();

App.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
