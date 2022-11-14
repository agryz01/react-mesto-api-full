const { statusCodeErr } = require('../utils/statusCodeErr');

class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodeErr.CONFLICT;
  }
}

module.exports = ConflictErr;
