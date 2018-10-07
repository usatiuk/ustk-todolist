import React from 'react';

import LogoutLink from './LogoutLink';
import FetchButton from './FetchButton';
import Status from './Status';
import HeaderLink from './HeaderLink';

export default function UserHeader() {
  return (
    <div id="user-header">
      <FetchButton>sync</FetchButton>
      <Status />
      <HeaderLink to="/edit" text="edit"/>
      <LogoutLink>logout</LogoutLink>
    </div>
  );
}
