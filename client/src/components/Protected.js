import * as React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export default function Protected(WrappedComponent) {
  function Component({ loggedIn }) {
    return loggedIn ? <WrappedComponent /> : <Redirect to="/login" />;
  }

  Component.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  };

  function mapStateToProps(state) {
    return {
      loggedIn: state.user.user !== undefined && state.user.user !== null,
    };
  }

  return connect(
    mapStateToProps,
    null,
  )(Component);
}
