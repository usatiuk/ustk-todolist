import React from 'react';
import PropTypes from 'prop-types';

export default function Selector(props) {
  const lists = props.lists.map(list => (
    <option key={list.id} value={list.id}>
      {list.name}
    </option>
  ));
  return (
    <div id="listselector">
      <select value={props.list} onChange={e => props.onChange(e.target.value)}>
        {lists}
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
  onChange: PropTypes.func.isRequired,
};
