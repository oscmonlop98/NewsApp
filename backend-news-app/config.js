'use strict';

// Config options.
var appConstants = Object.freeze({
    DB_CONNECTION: "mongodb://localhost:27017/db_news",
    DB_OPTIONS: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    SERVER_HOST: "localhost",
    SERVER_PORT: "3000",
    CLIENT_PORT: "4200"
});

module.exports = appConstants;