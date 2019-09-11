import { config } from 'dotenv';
import ExpressApp from './expressApp';
import { DB_INIT } from './config/db';

config();

const App = new ExpressApp().app;
const { PORT } = process.env.PORT;

DB_INIT();

App.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
