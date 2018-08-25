import React from 'react';

import LogoutLink from './LogoutLink';
import FetchButton from './FetchButton';
import Status from './Status';

export default function UserHeader() {
  return (
    <div id="user-header">
      <FetchButton>sync</FetchButton>
      <Status />
      <LogoutLink>logout</LogoutLink>
    </div>
  );
}
