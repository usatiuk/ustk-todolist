import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';

import { logout } from '../actions/user';

function Link({ onClick, children }) {
  return (
    <ButtonBase
      style={{
        marginLeft: 'auto',
        marginRight: 0,
        padding: '0 1rem',
      }}
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
