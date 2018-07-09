import * as React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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
        placeholder="Add something!"
        onKeyPress={e => {
          if (e.key === 'Enter') {
            submit();
          }
        }}
      />
      <Button style={{ borderRadius: 0 }} id="add" onClick={() => submit()}>
        <AddIcon />
      </Button>
    </div>
  );
}

Input.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Input;
