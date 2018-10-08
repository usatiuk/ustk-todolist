import * as React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export default function OnlyUnauth(WrappedComponent) {
  function Component({ loggedIn }) {
    return loggedIn ? <Redirect to="/" /> : <WrappedComponent />;
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
