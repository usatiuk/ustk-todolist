import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

import './Selector.css';

export default function Selector({
  lists,
  list,
  onChange,
  editing,
  creating,
  addList,
  editList,
  listObjs,
}) {
  const listElements = lists.map(elem => (
    <option key={elem.id} value={elem.id}>
      {elem.name}
    </option>
  ));
  if (creating) {
    let input = null;
    return (
      <div id="listselector">
        <input
          ref={(node) => {
            input = node;
          }}
          id="input"
          type="text"
        />
        <button onClick={() => addList(input.value)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    );
  }
  if (editing) {
    let input = null;
    return (
      <div id="listselector">
        <input
          ref={(node) => {
            input = node;
          }}
          defaultValue={listObjs.lists[list].name}
          id="input"
          type="text"
        />
        <button onClick={() => editList(input.value)}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>
    );
  }
  return (
    <div id="listselector">
      <select value={list} onChange={e => onChange(e.target.value)}>
        {listElements}
      </select>
    </div>
  );
}

Selector.defaultProps = {
  list: '',
};

Selector.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  list: PropTypes.string,
  editing: PropTypes.bool.isRequired,
  creating: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  listObjs: PropTypes.func.isRequired,
};
