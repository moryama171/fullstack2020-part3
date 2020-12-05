const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://moryama:${password}@cluster0.jmwof.mongodb.net/phonebook-app?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = mongoose.Schema({
    name: String,
    number: String,
});
const Person = mongoose.model('Person', personSchema);

const showPeople = () => {
    Person.find({}).then(result => {
        console.log('==========')
        console.log('phonebook:');
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        console.log('==========')
        mongoose.connection.close();
    });
};

const name = process.argv[3];
const number = process.argv[4];

const addPerson = (name, number) => {

    const person = new Person({
        name: name,
        number: number,
    });

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
    });
}

if (process.argv.length === 3) {
    showPeople();
} else {
    addPerson(name, number);
}
