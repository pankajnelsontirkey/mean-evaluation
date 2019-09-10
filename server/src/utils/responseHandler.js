/** This file is a generic function to handle sending responses in a consistent manner
 * @parameters
 * err - in case of error accept the error object and create user-friendly error message, else should be null
 * info - message in case of no error/successful operation
 */

export const responseHandler = (res, code, err, msg, responseData) => {
  let data = responseData ? responseData : null;
  let error = err != null ? { error: err.name, message: err.errmsg } : null;
  let message = msg ? msg : '';

  res.status(code).send({ error, message, data });
};
