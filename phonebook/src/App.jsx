import { useState } from "react";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import { useEffect } from "react";
import axios from "axios";
import personsService from "./sevices/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
  const [createMessage, setCreateMessage] = useState(null)

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  let filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterInput.toLowerCase())
  );
  console.log("filteredpersons", filteredPersons);

  const handleSubmitBtn = (event) => {
    event.preventDefault();

    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    let isNameTheSame = persons
      .map((person) => (person.name === newName ? true : false))
      .includes(true);

    let isNumberTheSame = persons
      .map((person) => (person.number === newNumber ? true : false))
      .includes(true);

    if (isNameTheSame) {
      const person = persons.filter((person) => person.name === newName)[0];
      let id = persons.filter((person) => person.name === newName)[0].id;
      if (
        confirm(
          `${newName} is already added to phonebook. replace the old number to the new one?`
        )
      ) {
        personsService
          .update(id, { ...person, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id == id ? returnedPerson : person
              )
            );
          });
      }
      setNewName("");
      setNewNumber("");
    } else if(isNumberTheSame) {
      alert(`the number ${newNumber} is already added to phonebook. please enter another one`)
      setNewName('')
      setNewNumber('')
    } else {
      personsService.create(newPersonObject).then((returnedPerson) => {
        setCreateMessage(`added ${newName} succesfully`)
        setTimeout(() => {
          setCreateMessage(null)
        }, 3000);
        setPersons(persons.concat(returnedPerson));
      });
      setNewName("");
      setNewNumber("");
    }
  };

  const handleOnchangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleOnchangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterInput = (e) => {
    setFilterInput(e.target.value);
  };
  console.log(persons);

  const handleDelete = (id) => {
    let deletedPerson = persons.filter(person => person.id === id)
    personsService
      .remove(id)
      .then(setPersons(persons.filter((person) => person.id !== id)))
      .catch(error => {
        setErrorMessage(`the information of ${deletedPerson[0].name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000);
      });
  };
  return (
    <div>
      <Notification errorMessage={errorMessage} createMessage={createMessage}/>
      <h2>Phonebook</h2>
      <Filter filterInput={filterInput} handleFilterInput={handleFilterInput} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmitBtn={handleSubmitBtn}
        newName={newName}
        handleOnchangeName={handleOnchangeName}
        newNumber={newNumber}
        handleOnchangeNumber={handleOnchangeNumber}
      />
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
