const { statusCodeErr } = require('../utils/statusCodeErr');

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodeErr.NOT_FOUND;
  }
}

module.exports = NotFoundErr;
