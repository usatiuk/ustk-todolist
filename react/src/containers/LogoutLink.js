import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';

import { logout } from '../actions/user';

function Link({ onClick, children }) {
  const classes = ['logout'];
  return (
    <ButtonBase
      style={{
        marginRight: '1rem',
        padding: '0 0.5rem',
        borderRadius: '7px',
      }}
      className={classes.join(' ')}
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </ButtonBase>
  );
}

Link.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onClick: () => dispatch(logout()),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Link);
