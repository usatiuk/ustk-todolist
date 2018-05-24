import React from 'react';
import PropTypes from 'prop-types';

export default function Selector(props) {
  const lists = props.lists.map(list => <option value={list.id}>{list.name}</option>);
  return (
    <div>
      <select defaultValue={props.list} onChange={e => props.onChange(e.target.value)}>
        {lists}
      </select>
    </div>
  );
}

Selector.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
  })).isRequired,
  list: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
