require('dotenv').config();

const express = require('express');
const app = express();

const Person = require('./models/person');

const cors = require('cors');
const morgan = require('morgan');

app.use(cors());

app.use(express.static('build/'));

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'));

app.use(express.json());

app.get('/info', (request, response) => {
    const count = `Phonebook has info for ${persons.length} people`;
    const dateTime = new Date();
    response.send(`<p>${count}</p><p>${dateTime}</p>`);
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    });
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        response.send(person);
    } else {
        response.status(404).end();
    }
});

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name || !body.number) {
        response.status(400).json({
            error: 'resource must have name and number'
        });
    }
    const newPerson = new Person({
        name: body.name,
        number: body.number
    });
    newPerson.save()
        .then(result => {
            response.send(result);
            console.log(`added ${result.name} number ${result.number} to phonebook`);
        });
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Running on localhost:${PORT}`);
});