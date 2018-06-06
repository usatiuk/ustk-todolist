require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');
const db = require('./config/db');
const path = require('path');
const hsts = require('hsts');
const { redirectToHTTPS } = require('express-http-to-https');

require('./models/TodoList');
require('./models/User');
require('./models/Todo');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
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

app.use('/api/users', require('./routes/users'));

const auth = require('./routes/auth');

app.use('/api/lists', auth.required, require('./routes/lists'));
app.use('/api/todos', auth.required, require('./routes/todos'));

if (process.env.NODE_ENV === 'production') {
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
    case 'BadRequestError':
      res.status(400);
      res.json({ success: false, error });
      break;
    case 'AuthenticationError':
    case 'UnauthorizedError':
      res.status(401);
      res.json({ success: false, error });
      break;
    case 'NotFound':
      res.status(404);
      res.json({ success: false, error });
      break;
    default:
      res.status(500);
      res.json({ success: false, error });
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
