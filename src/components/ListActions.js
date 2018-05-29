import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';

export default function ListActions({
  addList, removeList, editList, list,
}) {
  return (
    <div id="listactions">
      <button onClick={() => addList(prompt('List name?'))}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <button onClick={() => removeList(list)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button onClick={() => editList(list, prompt('List name?'))}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
    </div>
  );
}

ListActions.defaultProps = {
  list: '',
};

ListActions.propTypes = {
  addList: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired,
  list: PropTypes.string,
};
