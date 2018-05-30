const mongoose = require('mongoose');
const config = require('./');

async function connect() {
  const { host, port, name } = config.db;
  const connectionString = `mongodb://${host}:${port}/${name}`;

  await mongoose.connect(connectionString);
}

async function disconnect() {
  await mongoose.disconnect();
}

module.exports = {
  connect,
  disconnect,
};
