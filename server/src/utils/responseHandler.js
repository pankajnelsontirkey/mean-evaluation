/** This file is a generic function to handle sending responses in a consistent manner
 * @parameters
 * err - in case of error accept the error object and create user-friendly error message, else should be null
 * info - message in case of no error/successful operation
 */

const responseHandler = (res, code, err, msg, data) => {
  const body = data !== null ? data : null;
  const error = err !== null ? { name: err.name, message: err.errmsg } : null;
  const message = msg !== null ? msg : '';
  const success = code === 200;

  const resObj = {
    success,
    error,
    message,
    body: { ...body }
  };

  return res.status(code).json(resObj);
};

export default responseHandler;
