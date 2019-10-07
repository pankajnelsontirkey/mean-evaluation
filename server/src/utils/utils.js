import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

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
  checkEmailToken: token => {
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded && !decoded.email) {
      const err = { name: 'badToken', errMsg: 'Bad token received.' };
      throw Error(err);
    }
    return decoded.email;
  },

  /* Method to generate loginToken after successful login */
  generateLoginToken: (userId, userRole) =>
    jwt.sign({ _id: userId, role: userRole, exp: 3600 }, process.env.SECRET),

  /* Method to check if login token is valid */
  checkLoginToken: userToken => {
    try {
      const decodedUser = jwt.verify(userToken, process.env.SECRET);
      return decodedUser;
    } catch (e) {
      return { error: { name: e.name, message: e.message } };
    }
  },

  bcryptGenerateHash: async password => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  },

  bcryptVerifyHash: async (password, hash) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
};

export default utils;
