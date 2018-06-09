import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';

import { fetchLists } from '../actions/lists';

function FetchButton({ onClick, children }) {
  return (
    <ButtonBase
      style={{
        marginRight: 'auto',
        padding: '0 0.5rem',
        borderRadius: '7px',
        marginLeft: '1rem',
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

FetchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onClick: () => dispatch(fetchLists()),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(FetchButton);
