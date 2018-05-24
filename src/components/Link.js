import React from 'react';
import PropTypes from 'prop-types';

export default function Link({ active, onClick, children }) {
  const classes = ['filter'];
  if (active) {
    classes.push('filter--active');
  }
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
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
