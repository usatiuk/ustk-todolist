import React from 'react';
import PropTypes from 'prop-types';

export default function ListActions({ addList, removeList, list }) {
  return (
    <div>
      <button onClick={() => addList(prompt('List name?'))}>Add</button>
      <button onClick={() => removeList(list)}>Remove</button>
    </div>
  );
}

ListActions.defaultProps = {
  list: '',
};

ListActions.propTypes = {
  addList: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
  list: PropTypes.string,
};
