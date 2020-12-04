# Part 3 / Phonebook Backend

This is my submission for the Full Stack Open [Course](https://fullstackopen.com/en) 2020, part 3.

This is the server for a phonebook web application.

Here you can find the [application](https://rocky-thicket-20623.herokuapp.com/).

## Learning focus

- create a server with `Node.js`+`Express`
- GET, POST, DELETE data
- receive request data
- middleware functions
- use `nodemon` library to restart server at changes
- use `morgan` library for logging
- use VS Code [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) to test requests
- deployment on Heroku

## Notes

### Middleware functions
- these are functions that can be used to handle `request` and `response` objects
- for example:
    - the built-in `express.json()` that converts *json* to *javascript*
    - a home-made function that handles calling of incorrect endpoints
- be mindful about the **order** in which middlewares are defined and called

## Stack

Uses Node.js v12.18.3 with Express.

Javascript follows ES6 specifications.

## Usage

First clone the project and navigate to root directory.

Install dependencies:

```
npm install
```

Run:

```
npm run dev
```

The server will run on [http://localhost:3001](http://localhost:3001).


## Improvements and beyond
