const { statusCodeErr } = require('../utils/statusCodeErr');

class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodeErr.FORBIDDEN;
  }
}

module.exports = ForbiddenErr;
