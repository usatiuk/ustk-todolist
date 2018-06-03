const env = process.env.NODE_ENV;

const prod = {
  app: {
    port: process.env.APP_PORT,
  },
  db: {
    uri: process.env.DB_URI,
  },
  secret: process.env.SECRET,
};

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 4000,
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
  prod,
  dev,
  test,
};

module.exports = config[env] || config.prod;
