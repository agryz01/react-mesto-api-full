const { statusCodeErr } = require('../utils/statusCodeErr');

class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodeErr.BAD_REQUEST;
  }
}

module.exports = BadRequestErr;
