import { useState } from "react";

const Filter = ({ filterInput, handleFilterInput }) => {
  return (
    <div>
        filter with text <input type="text" value={filterInput} onChange={handleFilterInput} />
    </div>
  );
};

export default Filter;
