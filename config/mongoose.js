const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Project_Management');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', () => {
    console.log('connected to database :: MongoDB');
});

module.exports = db;