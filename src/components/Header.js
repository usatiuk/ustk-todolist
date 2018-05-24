import React from 'react';
import FilterLink from '../containers/FilterLink';
import ListSelector from '../containers/ListSelector';
import { VisibilityFilters } from '../actions';

export default function Header() {
  return (
    <div className="header">
      <div id="listselector">
        <ListSelector />
      </div>
      <div className="filters">
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>all</FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>active</FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>completed</FilterLink>
      </div>
    </div>
  );
}
