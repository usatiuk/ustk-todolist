const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('tiny'));

app.use(methodOverride('_method'));

mongoose.connect(process.env.MONGODB_URI);

require('./models/Todo');
require('./models/TodoList');

// 404 route
app.use((req, res) => {
  res.status(404);

  if (req.accepts('html')) {
    res.send('404');
    return;
  }

  if (req.accepts('json')) {
    req.send({ error: 'Not found' });
    return;
  }

  res.type('txt').send('not found');
});

app.listen(process.env.PORT, () => {
  console.log('Started!');
});
