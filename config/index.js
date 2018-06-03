const env = process.env.NODE_ENV;

const production = {
  app: {
    port: process.env.PORT,
  },
  db: {
    uri: process.env.DB_URI || process.env.MONGODB_URI,
  },
  secret: process.env.SECRET,
};

const development = {
  app: {
    port: process.env.DEV_PORT || 4000,
  },
  db: {
    uri: process.env.DEV_DB_URI || 'mongodb://localhost/todolist',
  },
  secret: process.env.DEV_SECRET || 'devsecret',
};

const test = {
  secret: process.env.TEST_SECRET || 'testsecret',
};

const config = {
  production,
  development,
  test,
};

module.exports = config[env] || config.production;
