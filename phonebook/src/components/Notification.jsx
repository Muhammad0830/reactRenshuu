import { useState } from "react";

const Notification = ({ errorMessage, createMessage }) => {
  if (errorMessage !== null) {
    return (
      <div>
        <div>{errorMessage}</div>
      </div>
    );
  } else if (createMessage !== null) {
    return (
      <div>
        <div>{createMessage}</div>
      </div>
    );
  } else return null;
};

export default Notification;
