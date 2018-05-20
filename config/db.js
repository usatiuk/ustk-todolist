const mongoose = require('mongoose');
const config = require('./');

const { host, port, name } = config.db;
const connectionString = `mongodb://${host}:${port}/${name}`;

async function connect() {
  await mongoose.connect(connectionString);
}

async function disconnect() {
  await mongoose.disconnect();
}

module.exports = {
  connect,
  disconnect,
};
