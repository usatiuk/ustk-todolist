class NotFoundError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, NotFoundError);
    this.name = 'NotFound';
  }
}

module.exports = { NotFoundError };
