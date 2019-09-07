const dotenv = require('dotenv');
dotenv.config();

const ExpressApp = require('./app');
const AppInstance = new ExpressApp();
const PORT = process.env.PORT;

AppInstance.app.listen(PORT, () => {
  console.log(`Server started. Listening on port: ${PORT}`);
});
