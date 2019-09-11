/** This file is a generic function to handle sending responses in a consistent manner
 * @parameters
 * err - in case of error accept the error object and create user-friendly error message, else should be null
 * info - message in case of no error/successful operation
 */

const responseHandler = (res, code, err, msg, responseData) => {
  const data = responseData !== null ? responseData : null;
  const error = err !== null ? { error: err.name, message: err.errmsg } : null;
  const message = msg !== null ? msg : '';

  res.status(code).send({ error, message, data });
};

export default responseHandler;
