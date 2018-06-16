import React from 'react';
import PropTypes from 'prop-types';

import LogoutLink from '../containers/LogoutLink';
import FetchButton from '../containers/FetchButton';
import Status from '../containers/Status';

export default class UserHeader extends React.Component {
  componentDidUpdate() {
    if (
      (this.props.dirtyLists || this.props.dirtyTodos) &&
      !this.props.fetchingLists
    ) {
      this.props.fetchLists();
    }
  }

  render() {
    return (
      <div id="user-header">
        <FetchButton>sync</FetchButton>
        <Status />
        <LogoutLink>logout</LogoutLink>
      </div>
    );
  }
}

UserHeader.propTypes = {
  dirtyLists: PropTypes.bool.isRequired,
  dirtyTodos: PropTypes.bool.isRequired,
  fetchingLists: PropTypes.bool.isRequired,
  fetchLists: PropTypes.func.isRequired,
};
