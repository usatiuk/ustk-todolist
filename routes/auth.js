const jwt = require('express-jwt');
const { secret } = require('../config');

module.exports = {
  required: jwt({ secret }),
  optional: jwt({ secret, credentialsRequired: false }),
};
