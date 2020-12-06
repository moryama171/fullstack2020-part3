const mongoose = require('mongoose');

const url = 'mongodb+srv://moryama:fullstack@cluster0.jmwof.mongodb.net/phonebook-app?retryWrites=true&w=majority';

console.log('connecting to', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongdoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message);
    });

const personSchema = mongoose.Schema({
    name: String,
    number: String,
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);