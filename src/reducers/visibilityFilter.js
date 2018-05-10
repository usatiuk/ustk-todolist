import { VisibilityFilters, SET_VISIBILITY_FILTER } from "../actions";

const { SHOW_ALL } = VisibilityFilters;

export default function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return { ...state, visibilityFilter: action.filter };
    default:
      return state;
  }
}
