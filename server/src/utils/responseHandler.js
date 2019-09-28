/** This file is a generic function to handle sending responses in a consistent manner
 * @parameters
 * err - in case of error accept the error object and create user-friendly error message, else should be null
 * info - message in case of no error/successful operation
 */

const responseHandler = (res, code, err, msg, body) => {
  const success = code === 200;
  const error = err ? { name: err.name, message: err.errmsg } : null;
  const data = body;
  const message = msg;

  const resObj = { success, error, message, data };

  return res.status(code).json(resObj);
};

export default responseHandler;
