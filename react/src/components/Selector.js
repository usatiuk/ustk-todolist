import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { Spring, animated } from 'react-spring';

import './Selector.css';

const button = {
  width: 36,
  height: 36,
};

const icon = {
  fontSize: 24,
};

export default function Selector({
  lists,
  list,
  onChange,
  editing,
  creating,
  addList,
  editList,
}) {
  if (creating) {
    let input = null;
    return (
      <div id="listselector" className="list--input">
        <input
          ref={node => {
            input = node;
          }}
          id="input"
          type="text"
          onKeyPress={e => {
            if (e.key === 'Enter') {
              addList(input.value);
            }
          }}
        />
        <Spring native from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {styles => (
            <animated.button
              style={{ ...button, ...styles }}
              onClick={() => input.value.trim() && addList(input.value)}
            >
              <AddIcon style={icon} />
            </animated.button>
          )}
        </Spring>
      </div>
    );
  }
  if (editing) {
    let input = null;
    return (
      <div id="listselector" className="list--input">
        <input
          ref={node => {
            input = node;
          }}
          defaultValue={lists.lists[list].name}
          id="input"
          type="text"
          onKeyPress={e => {
            if (e.key === 'Enter') {
              editList(input.value);
            }
          }}
        />
        <Spring native from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {styles => (
            <animated.button
              style={{ ...button, ...styles }}
              onClick={() => input.value.trim() && editList(input.value)}
            >
              <CheckIcon style={icon} />
            </animated.button>
          )}
        </Spring>
      </div>
    );
  }
  if (list) {
    return (
      <div id="listselector">
        <Select
          style={{ fontSize: '1.5rem', width: '100%' }}
          value={list}
          onChange={e => onChange(e.target.value)}
        >
          {Object.values(lists.lists).map(elem => (
            <MenuItem key={elem.id} value={elem.id}>
              {elem.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }
  return null;
}

Selector.defaultProps = {
  list: '',
};

Selector.propTypes = {
  list: PropTypes.string,
  editing: PropTypes.bool.isRequired,
  creating: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  lists: PropTypes.object.isRequired,
};
