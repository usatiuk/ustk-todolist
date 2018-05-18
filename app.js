require('dotenv').config();

const config = require('./config');
require('./config/db');
const app = require('./config/app');

require('./models/Todo');
require('./models/TodoList');

app.use('/todos', require('./routes/todos'));
app.use('/lists', require('./routes/lists'));

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
      res.status(400);
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

const server = app.listen(config.app.port, () => {
  console.log('Started!');
});

module.exports = server;
