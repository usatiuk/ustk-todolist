import { connect } from "react-redux";
import TodoList from "../components/TodoList";
import { toggleItem, reomveItem, VisibilityFilters } from "../actions";

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
  return {
    items: getVisibleItems(state.items, state.visibilityFilter)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onItemClick: id => dispatch(toggleItem(id)),
    handleDelete: id => dispatch(reomveItem(id))
  };
}

const ItemsContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default ItemsContainer;
