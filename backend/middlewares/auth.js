const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/UnauthorizedErr');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'q@mDl|{rW|7K');
  } catch (err) {
    next(new UnauthorizedErr('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};
