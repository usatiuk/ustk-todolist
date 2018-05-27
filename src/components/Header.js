import React from 'react';
import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../actions';
import ListsContainer from '../containers/ListsContainer';

export default function Header() {
  return (
    <div className="header">
      <div id="listselector">
        <ListsContainer />
      </div>
      <div className="filters">
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>all</FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>active</FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>completed</FilterLink>
      </div>
    </div>
  );
}
