const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    {
        id: 1,
        name: "Van Veen",
        number: "000-12345"
    },
    {
        id: 2,
        name: "Ada Veen",
        number: "000-6789"
    },
    {
        id: 3,
        name: "Maria Antonietta",
        number: "111-11111"
    },
    {
        id: 4,
        name: "Luigi Augusto",
        number: "333-33333"
    }
];

app.get('/info', (request, response) => {
    const count = `Phonebook has info for ${persons.length} people`;
    const dateTime = new Date();
    response.send(`<p>${count}</p><p>${dateTime}</p>`);
});

app.get('/api/persons', (request, response) => {
    response.send(persons);
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

const generateId = () => Math.floor(Math.random() * (10000 - 5) + 5);

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name || !body.number) {
        response.status(400).json({
            error: 'resource must have name and number'
        });
    }
    const existing = persons.find((person) => person.name === body.name);
    if (existing) {
        response.status(303).json({
            error: 'name must be unique'
        });
        return;
    }
    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    };
    persons = persons.concat(newPerson);
    response.json(newPerson);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Running on localhost:${PORT}`);