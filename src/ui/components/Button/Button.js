import React from "react";
import classname from "classnames";

import $ from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // or 'secondary'
}) => {
  return (
    <button
      //  Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      className={classname($.button, {
        [$.primary]: variant === "primary",
        [$.secondary]: variant === "secondary",
      }) }
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
