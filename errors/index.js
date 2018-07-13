class NotFoundError extends Error {
  constructor(text, ...args) {
    super(...args);
    Error.captureStackTrace(this, NotFoundError);
    this.name = 'NotFound';
    this.text = text;
    this.code = 404;
  }
}

class BadRequestError extends Error {
  constructor(text, ...args) {
    super(...args);
    Error.captureStackTrace(this, NotFoundError);
    this.name = 'BadRequest';
    this.text = text;
    this.code = 400;
  }
}

module.exports = { NotFoundError, BadRequestError };
