const mongoose = require('mongoose');
require('dotenv').config("../.env");
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/project3-db');

module.exports = mongoose.connection;
