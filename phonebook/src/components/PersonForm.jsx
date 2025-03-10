import { useState } from "react";

const PersonForm = ({
  handleSubmitBtn,
  newName,
  handleOnchangeName,
  newNumber,
  handleOnchangeNumber,
  errorMessage,
}) => {
  return (
    <form onSubmit={handleSubmitBtn}>
      <div>
        <label htmlFor="input" style={{ color: "red" }}>
          {errorMessage}
        </label>
        <div>
          name:{" "}
          <input name="input" value={newName} onChange={handleOnchangeName} />
        </div>
      </div>
      <div>
        <label htmlFor="input"></label>
        <div>
          number: <input value={newNumber} onChange={handleOnchangeNumber} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
