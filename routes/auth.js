const jwt = require('express-jwt');
const { secret } = require('../config');

module.exports = {
  required: jwt({ secret, algorithms: ['HS256'] }),
  optional: jwt({ secret, credentialsRequired: false, algorithms: ['HS256'] }),
};
