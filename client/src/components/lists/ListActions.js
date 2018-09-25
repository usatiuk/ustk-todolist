import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import BackButton from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Transition, config } from 'react-spring';

const button = {
  width: 30,
  height: 30,
  padding: 0,
};

const icon = {
  fontSize: 24,
};

export default function ListActions({
  startCreateList,
  removeList,
  startEditList,
  stopCreateList,
  stopEditList,
  creating,
  editing,
  list,
}) {
  function back() {
    if (editing) {
      stopEditList();
    }
    if (creating) {
      stopCreateList();
    }
  }
  const actions = [];
  if (!creating && !editing) {
    actions.push(styles => (
      <IconButton
        key="create"
        style={{ ...button, ...styles }}
        onClick={() => startCreateList()}
      >
        <AddIcon style={icon} />
      </IconButton>
    ));
  }
  if (list && !creating && !editing) {
    actions.push(styles => (
      <IconButton
        key="remove"
        style={{ ...button, ...styles }}
        onClick={() => removeList()}
      >
        <DeleteIcon style={icon} />
      </IconButton>
    ));
  }
  if (list && !creating && !editing) {
    actions.push(styles => (
      <IconButton
        key="edit"
        style={{ ...button, ...styles }}
        onClick={() => startEditList()}
      >
        <EditIcon style={icon} />
      </IconButton>
    ));
  }
  if (creating || editing) {
    actions.push(styles => (
      <IconButton
        key="back"
        style={{ ...button, ...styles }}
        className="backbutton"
        onClick={() => back()}
      >
        <BackButton style={icon} />
      </IconButton>
    ));
  }
  return (
    <div id="listactions">
      <Transition
        config={{
          ...config.stiff,
          overshootClamping: true,
          restSpeedThreshold: 0.5,
          restDisplacementThreshold: 0.5,
        }}
        keys={actions.map(action => action({}).key)}
        from={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
        enter={{ opacity: 1, height: 30, margin: 0, padding: 0 }}
        leave={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
      >
        {actions}
      </Transition>
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
  stopCreateList: PropTypes.func.isRequired,
  stopEditList: PropTypes.func.isRequired,
};
