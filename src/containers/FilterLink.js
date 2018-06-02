import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { setVisibilityFilter } from '../actions/todos';

function Link({ active, onClick, children }) {
  const classes = ['filter'];
  if (active) {
    classes.push('filter--active');
  }
  return (
    <button
      className={classes.join(' ')}
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Link);
