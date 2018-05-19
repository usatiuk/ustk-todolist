class NotFoundError extends Error {
  constructor(text, ...args) {
    super(...args);
    Error.captureStackTrace(this, NotFoundError);
    this.name = 'NotFound';
    this.text = text;
  }
}

class BadRequestError extends Error {
  constructor(text, ...args) {
    super(...args);
    Error.captureStackTrace(this, NotFoundError);
    this.name = 'BadRequest';
    this.text = text;
  }
}

module.exports = { NotFoundError, BadRequestError };
