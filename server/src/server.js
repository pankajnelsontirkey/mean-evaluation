const app = require('./app');
const { DB_INIT } = require('./config/db');

require('dotenv').config;

console.log(process.env.ABCD);

DB_INIT();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started. Listening on port: ${PORT}`);
});
