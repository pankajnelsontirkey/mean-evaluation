import utils from '../utils/utils';

const verifyAuth = (req, res, next) => {
  if (!req.headers || !req.headers.auth) {
    res.status(401).json({ message: 'Unauthorized Access' });
    return;
  }
  const { auth } = req.headers;
  const { _id } = utils.checkLoginToken(auth);

  req.userId = _id;

  next();
};

export default verifyAuth;
