import React from 'react';
import FilterLink from './FilterLink';
import { VisibilityFilters } from '../../actions/defs';

function Filters(styles) {
  return (
    <div style={styles} id="filters">
      <FilterLink filter={VisibilityFilters.SHOW_ALL}>all</FilterLink>
      <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>active</FilterLink>
      <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
        completed
      </FilterLink>
    </div>
  );
}

export default Filters;
