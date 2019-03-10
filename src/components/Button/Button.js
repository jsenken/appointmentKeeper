import React from "react";
const Button = ({ type = "default", className, children, onClick , clearForm }) => (
  <button
    onClick={onClick}
    className={["btn options", `btn-${type}`, className].join(" ")}
  >
    {children}
  </button>
);

export default Button;
