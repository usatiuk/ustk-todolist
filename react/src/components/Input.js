import * as React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

function Input(props) {
  let input;

  function submit() {
    if (input.value.trim() !== '') {
      props.onClick(input.value);
    }
    input.value = '';
  }

  return (
    <div id="inputs">
      <input
        ref={node => {
          input = node;
        }}
        id="input"
        type="text"
        onKeyPress={e => {
          if (e.key === 'Enter') {
            submit();
          }
        }}
      />
      <Button id="add" onClick={() => submit()}>
        add
      </Button>
    </div>
  );
}

Input.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Input;
