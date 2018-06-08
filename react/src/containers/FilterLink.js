import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';
import { setVisibilityFilter } from '../actions/todos';

function Link({ active, onClick, children }) {
  const classes = ['filter'];
  if (active) {
    classes.push('filter--active');
  }
  return (
    <ButtonBase
      style={{
        margin: '0 0.2rem',
        padding: '1rem 0.3rem',
        color: active ? 'black' : '#444444',
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
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Link);
