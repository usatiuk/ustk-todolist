class NotFoundError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, NotFoundError);
    this.name = 'NotFound';
  }
}

class BadRequestError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, NotFoundError);
    this.name = 'BadRequest';
  }
}

module.exports = { NotFoundError, BadRequestError };
