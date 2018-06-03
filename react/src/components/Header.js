import React from 'react';
import FilterLink from '../containers/FilterLink';
import LogoutLink from '../containers/LogoutLink';
import { VisibilityFilters } from '../actions/todos';
import ListsContainer from '../containers/ListsContainer';

export default function Header() {
  return (
    <div id="header">
      <div id="user-header">
        <LogoutLink>logout</LogoutLink>
      </div>
      <div id="lists-header">
        <ListsContainer />
        <div id="filters">
          <FilterLink filter={VisibilityFilters.SHOW_ALL}>all</FilterLink>
          <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>active</FilterLink>
          <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
            completed
          </FilterLink>
        </div>
      </div>
    </div>
  );
}
