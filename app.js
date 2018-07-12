require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');
const db = require('./config/db');
const path = require('path');
const hsts = require('hsts');
const compression = require('compression');
const { redirectToHTTPS } = require('express-http-to-https');

require('./models/TodoList');
require('./models/User');
require('./models/Todo');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());
process.env.NODE_ENV === 'production'
  ? app.use(morgan('combined'))
  : app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production' && process.env.HSTS === 'true') {
  app.use(redirectToHTTPS([/localhost:(\d{4})/]));
  app.use(
    hsts({
      maxAge: 31536000,
      includeSubDomains: true,
    }),
  );
}

const passport = require('./config/passport');

app.use(passport.initialize());

// Addresses, starting with /__, are not cached by service worker
// https://github.com/facebook/create-react-app/issues/2237

app.use('/__/users', require('./routes/users'));

const auth = require('./routes/auth');

app.use('/__/lists', auth.required, require('./routes/lists'));
app.use('/__/todos', auth.required, require('./routes/todos'));

if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'development'
) {
  app.use(express.static(path.join(__dirname, 'react/build')));
  app.use('*', express.static(path.join(__dirname, 'react/build/index.html')));
}

// 404 route
app.use((req, res) => {
  res.status(404);

  if (req.accepts('html')) {
    res.send('404');
    return;
  }

  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  res.type('txt').send('not found');
});

// handle errors
app.use((error, req, res, next) => {
  switch (error.name) {
    case 'ValidationError':
    case 'MissingPasswordError':
    case 'BadRequest':
    case 'BadRequestError':
      res.status(400);
      break;
    case 'AuthenticationError':
    case 'UnauthorizedError':
      res.status(401);
      break;
    case 'NotFound':
      res.status(404);
      break;
    default:
      res.status(500);
  }
  res.json({ success: false, error });
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'test'
  ) {
    console.error(error);
  }
  next(error);
});

let server;
if (process.env.NODE_ENV !== 'test') {
  db.connect();
  server = app.listen(config.app.port, () => {
    console.log(`Listening on port ${config.app.port}`);
    console.log('Started!');
  });
} else {
  server = app;
}

module.exports = server;
