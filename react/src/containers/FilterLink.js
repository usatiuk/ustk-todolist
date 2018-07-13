import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';
import setVisibilityFilter from '../actions/visibilityFilter';

function Link({ active, onClick, children }) {
  const classes = ['filter'];
  if (active) {
    classes.push('filter--active');
  }
  return (
    <ButtonBase
      style={{
        padding: '0 1rem',
        color: active ? 'black' : '#444444',
        height: '2rem',
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
