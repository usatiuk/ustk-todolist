import { connect } from "react-redux";
import TodoList from "../components/TodoList";
import { toggleItem, removeItem, VisibilityFilters } from "../actions";

function getVisibleItems(items, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return items;
    case VisibilityFilters.SHOW_ACTIVE:
      return items.filter(item => !item.completed);
    case VisibilityFilters.SHOW_COMPLETED:
      return items.filter(item => item.completed);
    default:
      return items;
  }
}

function mapStateToProps(state) {
  const stub = {
    list,
    items: [],
    dirty: true
  };
  const list = state.lists.list;
  const listObj = state.lists.lists[list];
  if (!list) {
    return stub;
  }
  const listItems = state.lists.lists[list].todos;
  if (!listItems) {
    return stub;
  }
  return {
    list,
    items: getVisibleItems(listItems, state.visibilityFilter),
    dirty: listObj.dirty
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onItemClick: (list, id) => dispatch(toggleItem(list, id)),
    handleDelete: (list, id) => dispatch(removeItem(list, id))
  };
}

const ItemsContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default ItemsContainer;
