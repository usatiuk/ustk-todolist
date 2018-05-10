import * as React from "react";
import PropTypes from "prop-types";

function Input(props) {
  let input;

  const classes = [];

  if (!props.inputBottomBorder) {
    classes.push("no-border");
  }

  return (
    <div id="inputs" className={classes.join(" ")}>
      <input
        ref={node => {
          input = node;
        }}
        id="input"
        type="text"
      />
      <button id="add" onClick={() => props.onClick(input.value)}>
        add
      </button>
    </div>
  );
}

Input.propTypes = {
  inputBottomBorder: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Input;
