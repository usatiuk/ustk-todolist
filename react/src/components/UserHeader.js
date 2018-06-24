import React from 'react';

import LogoutLink from '../containers/LogoutLink';
import FetchButton from '../containers/FetchButton';
import Status from '../containers/Status';

export default function UserHeader() {
  return (
    <div id="user-header">
      <FetchButton>sync</FetchButton>
      <Status />
      <LogoutLink>logout</LogoutLink>
    </div>
  );
}
