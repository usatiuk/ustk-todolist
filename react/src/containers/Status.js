import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';

function Status({ userFetching, listsFetching }) {
  return (
    <ButtonBase
      style={{
        marginRight: 'auto',
        padding: '0 0.5rem',
        borderRadius: '7px',
        marginLeft: '1rem',
      }}
    >
      {userFetching ? 'user' : null}
      {listsFetching ? 'lists' : null}
    </ButtonBase>
  );
}

Status.propTypes = {
  userFetching: PropTypes.bool.isRequired,
  listsFetching: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    userFetching: state.user.fetching,
    listsFetching: state.lists.fetching,
  };
}

export default connect(mapStateToProps)(Status);
