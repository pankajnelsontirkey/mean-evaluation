import * as jwt from 'jsonwebtoken';

const utils = {
  /* Method to generate a token for email verification */
  generateEmailToken: async (userEmail, userId) => {
    /* the current timestamp in milliseconds */
    const now = Date.now();
    /* exp is 12hrs * 60mins * 60secs * 1000ms */
    const expiresAt = parseInt(now + 12 * 60 * 60 * 1000, 10);
    return jwt.sign(
      { email: userEmail, _id: userId, exp: expiresAt },
      process.env.SECRET
    );
  },

  /* Method to verify a token */
  checkEmailToken: async token => {
    console.log(token);

    // return jwt.verify(token, process.env.SECRET);
    /* return boolean  */
  },

  /* Method to generate loginToken after successful login */
  generateLoginToken: async (userId, userRole) =>
    jwt.sign({ _id: userId, role: userRole }, process.env.SECRET),
  /* Method to check if login token is valid */
  checkLoginToken: () => {
    /* return boolean */
  }
};

export default utils;
