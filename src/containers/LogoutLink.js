import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../actions/user';

function Link({ onClick, children }) {
  const classes = ['logout'];
  return (
    <button
      className={classes.join(' ')}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
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

export default connect(null, mapDispatchToProps)(Link);
