require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');
const db = require('./config/db');

require('./models/TodoList');
require('./models/User');
require('./models/Todo');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

const passport = require('./config/passport');

app.use(passport.initialize());

app.use('/users', require('./routes/users'));

const auth = require('./routes/auth');

app.use('/lists', auth.required, require('./routes/lists'));
app.use('/todos', auth.required, require('./routes/todos'));

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
    console.log('Started!');
  });
} else {
  server = app;
}

module.exports = server;
