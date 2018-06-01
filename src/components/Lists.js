import React from 'react';
import PropTypes from 'prop-types';
import Selector from './Selector';
import ListActions from './ListActions';

export default function Lists({
  list,
  lists,
  onChange,
  addList,
  creating,
  editing,
  removeList,
  startCreateList,
  startEditList,
  editList,
  listObjs,
}) {
  const selectorProps = {
    list,
    lists,
    creating,
    editing,
    onChange,
    editList,
    addList,
    listObjs,
  };
  const actionsProps = {
    startCreateList,
    removeList,
    startEditList,
    list,
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
  startCreateList: PropTypes.func.isRequired,
  startEditList: PropTypes.func.isRequired,
  creating: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  listObjs: PropTypes.any.isRequired,
};
