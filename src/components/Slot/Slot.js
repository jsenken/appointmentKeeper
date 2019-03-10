import React from "react";
import "./Slot.css"

const Slot = props => (
  <button
    type="button"
    className={props.className}
    onClick={() => props.showModal(props.id)}
  >
    {props.title}
  </button>
);

export default Slot;
