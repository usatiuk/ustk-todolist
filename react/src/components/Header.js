import React from 'react';
import UserHeader from '../components/UserHeader';
import ListsContainer from '../containers/ListsContainer';

export default function Header() {
  return (
    <div id="header">
      <UserHeader />
      <ListsContainer />
    </div>
  );
}
