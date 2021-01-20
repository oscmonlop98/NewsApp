'use strict'

// Imports
const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const cors = require('cors');

// Server
const app = express();

// Tools to use
app.use(express.json());
app.use(cors({origin: "http://" + config.SERVER_HOST + ":" + config.CLIENT_PORT}));
app.use(routes);

// Set some app variables
app.set("port", process.env.PORT || config.SERVER_PORT);
app.set("host", process.env.HOST || config.SERVER_HOST);

// Database connection
mongoose.connect(config.DB_CONNECTION, config.DB_OPTIONS, (err, res) => {

    if(err) {
        return console.log(err);
    } else {
        console.log("Database connection established...");
    }

});

// Listen on provided port.
app.listen(app.get("port"), () => {
    console.log("Server running at http://" + app.get("host") + ":" + app.get("port"));
});

