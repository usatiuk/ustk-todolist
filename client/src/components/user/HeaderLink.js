import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';

function Link({ history, to, text }) {
  return (
    <ButtonBase
      style={{
        marginLeft: '0',
        marginRight: 'auto',
        padding: '0 1rem',
      }}
      onClick={e => {
        e.preventDefault();
        history.push(to);
      }}
    >
      {text}
    </ButtonBase>
  );
}

Link.propTypes = {
  history: PropTypes.any,
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default withRouter(Link);
