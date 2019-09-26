/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */

import register from './register';
import verifyEmail from './verifyEmail';
import login from './login';
import logout from './logout';
import autoLogin from './autoLogin';

const authController = {
  register,
  verifyEmail,
  login,
  logout,
  autoLogin
};

export default authController;
