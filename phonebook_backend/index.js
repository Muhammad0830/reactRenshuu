require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const Person = require("./models/person");
const person = require("./models/person");
const note = require("../classwork_backend/models/note");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
app.use(requestLogger);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response, next) => {
  Person.find({}).then((allPersons) => {
    response.send(`
    <p>Phonebook has info for ${allPersons.length} people</p> </br>
    ${new Date()}
    `);
  });
});

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((allPersons) => {
      response.json(allPersons);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "Name missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "Number missing",
    });
  }
  let newError;
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  newError = person.validateSync();
  console.log("error", newError);
  person
    .save({ runValidators: true })
    .then((savedPerson) => {
      console.log("error", newError);
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((deletedPerson) => response.status(204).end())
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send(`
    <div style="display:flex; flex-direction:column; align-items: center; color: red">
    <h1>404</h1>
    <h2>not found</h2>
    <h3>unknown endpoint</h3>
    </div>
  `);
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name == "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    const errorMessages = Object.values(error.errors).map((err) => err.message);
    return response.status(400).json({ error: errorMessages.join(", ") });
  }

  return response.status(400).json({ error: error.message });

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
