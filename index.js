require('dotenv').config();

const express = require('express');
const app = express();

const Person = require('./models/person');

const cors = require('cors');
const morgan = require('morgan');

app.use(cors());

app.use(express.static('build/'));

app.use(express.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'));


app.get('/info', (request, response) => {
    Person.find({})
        .then(persons => {
            const count = `Phonebook has info for ${persons.length} people`;
            const dateTime = new Date();
            response.send(`<p>${count}</p><p>${dateTime}</p>`);
        });
});

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => {
            response.json(persons);
        });
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            person
                ? response.json(person)
                : response.status(404).end();
        })
        .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
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
        })
        .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
    };

    Person.findOneAndUpdate({ id: request.params.id }, person, {
        new: true,
        runValidators: true,
        context: 'query'
    })
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => next(error));
});


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            result !== null
                ? response.status(204).end()
                : response.status(404).end();
        })
        .catch(error => next(error));
});


const errorHandler = (error, request, response, next) => {
    console.log(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(303).json({ error: error.message });
    }

    next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Running on localhost:${PORT}`);
});
