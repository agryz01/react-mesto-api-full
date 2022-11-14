const { statusCodeErr } = require('../utils/statusCodeErr');

class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodeErr.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedErr;
