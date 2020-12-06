const mongoose = require('mongoose');

const url = 'mongodb+srv://moryama:fullstack@cluster0.jmwof.mongodb.net/phonebook-app?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = mongoose.Schema({
    name: String,
    number: String,
});

// TODO: Define 'toJson' method

module.exports = mongoose.model('Person', personSchema);