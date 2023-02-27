import React from "react";

import $ from "./ErrorMessage.module.css";

const ErrorMessage = ({ error }) => {
  return (
    <div className={$.errorMessage}>{error.errormessage}</div>
  );
};

export default ErrorMessage;