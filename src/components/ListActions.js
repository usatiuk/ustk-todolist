import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';

export default function ListActions({
  startCreateList,
  removeList,
  startEditList,
  creating,
  list,
}) {
  const editRemoveButtons = list
    ? [
      <button onClick={() => removeList()}>
        <FontAwesomeIcon icon={faTrash} />
      </button>,
      <button onClick={() => startEditList()}>
        <FontAwesomeIcon icon={faEdit} />
      </button>,
    ]
    : null;
  return (
    <div id="listactions">
      <button onClick={() => startCreateList()}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {!list && !creating ? 'add list' : null}
      {editRemoveButtons}
    </div>
  );
}

ListActions.defaultProps = {
  list: '',
};

ListActions.propTypes = {
  startCreateList: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
  startEditList: PropTypes.func.isRequired,
  creating: PropTypes.bool.isRequired,
  list: PropTypes.string,
};
