const env = process.env.NODE_ENV;

const production = {
  app: {
    port: process.env.PORT || 4000,
  },
  db: {
    uri:
      process.env.DB_URI ||
      process.env.MONGODB_URI ||
      'mongodb://localhost/todolist',
  },
  secret: process.env.SECRET,
};

const development = {
  ...production,
  secret: process.env.SECRET || 'devsecret',
};

const test = {
  ...production,
  secret: process.env.SECRET || 'testsecret',
};

const config = {
  production,
  development,
  test,
};

module.exports = config[env] || config.production;
