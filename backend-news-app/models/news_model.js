'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Mongo Schema
var NewsSchema = Schema({
    title: String,
    description: String,
    date: Date,
    content: String,
    author: String,
    archiveDate: Date
});

module.exports = mongoose.model("News", NewsSchema, 'news');