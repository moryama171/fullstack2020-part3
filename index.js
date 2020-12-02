const express = require('express');
const app = express();

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

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Running on localhost:${PORT}`);