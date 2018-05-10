import { connect } from "react-redux";
import TodoList from "../components/TodoList";
import { toggleItem, reomveItem } from "../actions";

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    onItemClick: id => dispatch(toggleItem(id)),
    handleDelete: id => dispatch(reomveItem(id))
  };
}

const ItemsContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default ItemsContainer;
