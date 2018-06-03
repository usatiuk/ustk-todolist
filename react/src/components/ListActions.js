import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import BackButton from '@material-ui/icons/ArrowBack';
import React from 'react';
import PropTypes from 'prop-types';

const button = {
  width: 24,
  height: 24,
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
  return (
    <div id="listactions">
      {!creating &&
        !editing && (
          <IconButton style={button} onClick={() => startCreateList()}>
            <AddIcon style={icon} />
          </IconButton>
        )}
      {!list && !creating ? 'add list' : null}
      {list &&
        !creating &&
        !editing && (
          <IconButton style={button} onClick={() => removeList()}>
            <DeleteIcon style={icon} />
          </IconButton>
        )}
      {list &&
        !creating &&
        !editing && (
          <IconButton style={button} onClick={() => startEditList()}>
            <EditIcon style={icon} />
          </IconButton>
        )}

      {(creating || editing) && (
        <IconButton
          style={button}
          className="backbutton"
          onClick={() => back()}
        >
          <BackButton style={icon} />
        </IconButton>
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
  stopCreateList: PropTypes.func.isRequired,
  stopEditList: PropTypes.func.isRequired,
};
