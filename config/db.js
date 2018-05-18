const mongoose = require('mongoose');
const config = require('./');

const { host, port, name } = config.db;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString);
