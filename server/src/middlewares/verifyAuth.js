import utils from '../utils/utils';
import responseHandler from '../utils/responseHandler';

const verifyAuth = (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    console.log('[verifyAuth]: No Authorization in header.');
    responseHandler(res, 400, {
      name: 'invalidHeader',
      message: 'Unexpected header received.'
    });
    return;
  } else {
    const { authorization } = req.headers;
    const token = authorization.slice(7);
    try {
      const decodedToken = utils.checkLoginToken(token);
      if (decodedToken.error) {
        console.log(decodedToken.error);
        return responseHandler(
          res,
          400,
          decodedToken.error,
          'jsonwebtoken error',
          null
        );
      } else if (!decodedToken._id) {
        console.log('[verifyAuth]: _id not found in token');
        responseHandler(
          res,
          400,
          { name: 'corruptData', message: '_id was not found from token' },
          'Invalid data in token',
          null
        );
      } else {
        req.userId = decodedToken._id;
        next();
      }
    } catch (e) {
      console.log(e);
      responseHandler(
        res,
        400,
        { name: e.name, errMsg: e.message },
        'An error occurred',
        null
      );
    }
  }
};

export default verifyAuth;
