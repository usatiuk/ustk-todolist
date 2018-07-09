import React from 'react';
import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../actions/todos';

function Filters() {
  return (
    <div id="filters">
      <FilterLink filter={VisibilityFilters.SHOW_ALL}>all</FilterLink>
      <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>active</FilterLink>
      <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
        completed
      </FilterLink>
    </div>
  );
}

export default Filters;
