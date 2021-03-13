const env = process.env.NODE_ENV;

const production = {
    app: {
        port: process.env.PORT || 4000,
    },
    db: {
        uri:
            process.env.DB_URI ||
            process.env.MONGODB_URI ||
            "mongodb://localhost/todolist",
    },
    googleOAuth: {
        googleEnabled: process.env.GOOGLE_ENABLED
            ? process.env.GOOGLE_ENABLED.toUpperCase() === "TRUE"
            : false,
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        googleCallback: `${process.env.HOST}/__/users/login/google/callback`,
    },
    secret: process.env.SECRET,
};

const development = {
    ...production,
    secret: process.env.SECRET || "devsecret",
};

const test = {
    ...production,
    secret: process.env.SECRET || "testsecret",
};

const config = {
    production,
    development,
    test,
};

module.exports = config[env] || config.production;
