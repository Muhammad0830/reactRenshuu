import { useState } from "react";

const PersonForm = ({
  handleSubmitBtn,
  newName,
  handleOnchangeName,
  newNumber,
  handleOnchangeNumber,
}) => {
  return (
    <form onSubmit={handleSubmitBtn}>
      <div>
        name: <input value={newName} onChange={handleOnchangeName} />
      </div>
      <div>
        number:{" "}
        <input
          type="number"
          value={newNumber}
          onChange={handleOnchangeNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
