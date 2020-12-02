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

app.get('/api/persons', (request, response) => {
    response.send(persons);
});

app.get('/info', (request, response) => {
    const count = `Phonebook has info for ${persons.length} people`;
    const dateTime = new Date();
    response.send(`<p>${count}</p><p>${dateTime}</p>`);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Running on localhost:${PORT}`);