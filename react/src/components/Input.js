import * as React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function Input({ onClick, styles }) {
  let input;

  function submit() {
    if (input.value.trim() !== '') {
      onClick(input.value);
    }
    input.value = '';
  }

  return (
    <div style={styles} id="inputs">
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
  styles: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Input;
