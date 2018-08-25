import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import BackButton from '@material-ui/icons/ArrowBack';
import React from 'react';
import PropTypes from 'prop-types';
import { Transition, config, animated } from 'react-spring';

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
      <animated.button
        key="create"
        style={{ ...button, ...styles }}
        onClick={() => startCreateList()}
      >
        <AddIcon style={icon} />
      </animated.button>
    ));
  }
  if (list && !creating && !editing) {
    actions.push(styles => (
      <animated.button
        key="remove"
        style={{ ...button, ...styles }}
        onClick={() => removeList()}
      >
        <DeleteIcon style={icon} />
      </animated.button>
    ));
  }
  if (list && !creating && !editing) {
    actions.push(styles => (
      <animated.button
        key="edit"
        style={{ ...button, ...styles }}
        onClick={() => startEditList()}
      >
        <EditIcon style={icon} />
      </animated.button>
    ));
  }
  if (creating || editing) {
    actions.push(styles => (
      <animated.button
        key="back"
        style={{ ...button, ...styles }}
        className="backbutton"
        onClick={() => back()}
      >
        <BackButton style={icon} />
      </animated.button>
    ));
  }
  return (
    <div id="listactions">
      <Transition
        native
        config={config.stiff}
        keys={actions.map(action => action({}).key)}
        from={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
        enter={{ opacity: 1, height: 30 }}
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
