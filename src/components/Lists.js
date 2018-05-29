import React from 'react';
import PropTypes from 'prop-types';
import Selector from './Selector';
import ListActions from './ListActions';

export default function Lists({
  list, lists, onChange, addList, removeList, editList,
}) {
  const selectorProps = { list, lists, onChange };
  const actionsProps = {
    addList, removeList, editList, list,
  };
  return (
    <div id="lists">
      <ListActions {...actionsProps} />
      <Selector {...selectorProps} />
    </div>
  );
}

Lists.defaultProps = {
  list: '',
};

Lists.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  list: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired,
};
