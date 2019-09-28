const checkAuthentication = (req, res, next) => {
  const { headers } = req;
  console.log(headers);
  next();
};

export default checkAuthentication;
