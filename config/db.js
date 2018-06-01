const mongoose = require('mongoose');
const config = require('./');

async function connect() {
  await mongoose.connect(config.db.uri);
}

async function disconnect() {
  await mongoose.disconnect();
}

module.exports = {
  connect,
  disconnect,
};
