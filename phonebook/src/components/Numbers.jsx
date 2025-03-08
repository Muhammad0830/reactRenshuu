import { useState } from "react";

const Numbers = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person, index) => {
        return (
          <div key={index}>
            <span>{person.name}</span> {" "}
            <span>{person.number}</span>
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Numbers;
