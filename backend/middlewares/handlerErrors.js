const { statusCodeErr } = require('../utils/statusCodeErr');

module.exports.handlerErrors = (err, req, res, next) => {
  const { statusCode = statusCodeErr.INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === statusCodeErr.INTERNAL_SERVER_ERROR
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
};
