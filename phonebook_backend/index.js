const express = require("express");
const app = express();
const cors = require('cors');



const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(express.static("dist"))
app.use(cors())
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

const generateId = () => {
  const maxId = Math.max(...persons.map((person) => Number(person.id)));
  return maxId + 1;
};

app.get("/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p> </br>
    ${new Date()}
    `);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.post("/api/persons", (request, response) => {
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

  let isIncludesTrue = persons
    .map((person) =>
      person.name.toLowerCase() === body.name.toLowerCase() ? true : false
    )
    .includes(true);

  if (isIncludesTrue) {
    return response.status(400).json({
      error: `the name ${body.name} has been already added. please try another name.`,
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  const person = persons.filter((person) => person.id === id);
  console.log("person", person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`the project is running on server ${PORT}`);
});
