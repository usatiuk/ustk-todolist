import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';

export default function ListActions({
  startCreateList,
  removeList,
  startEditList,
  creating,
  editing,
  list,
}) {
  return (
    <div id="listactions">
      {!creating && (
        <button onClick={() => startCreateList()}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
      {!list && !creating ? 'add list' : null}
      {list && (
        <button onClick={() => removeList()}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
      {list &&
        !editing && (
          <button onClick={() => startEditList()}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
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
  editing: PropTypes.bool.isRequired,
  list: PropTypes.string,
};
