const env = process.env.NODE_ENV;

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 4000,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'todolist',
  },
  secret: process.env.DEV_SECRET || 'devsecret',
};
const test = {
  app: {
    port: process.env.TEST_APP_PORT || 4001,
  },
  db: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: process.env.TEST_DB_PORT || 27017,
    name: process.env.TEST_DB_NAME || 'todolistTest',
  },
  secret: process.env.TEST_SECRET || 'testsecret',
};

const config = {
  dev,
  test,
};

module.exports = config[env] || config.dev;
