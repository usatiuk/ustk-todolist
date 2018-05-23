import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Input from "../components/Input";
import { addItem, VisibilityFilters } from "../actions";

const InputContainer = props => (
  <Input
    inputBottomBorder={props.inputBottomBorder}
    onClick={text => props.dispatch(addItem(props.list, text))}
  />
);

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

InputContainer.propTypes = {
  inputBottomBorder: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const list = state.lists.list;
  if (!list) {
    return {
      inputBottomBorder: false
    };
  }
  const listItems = state.lists.lists[list].todos;
  if (!listItems) {
    return { list, inputBottomBorder: false };
  }
  return {
    list,
    inputBottomBorder:
      getVisibleItems(listItems, state.visibilityFilter).length !== 0
  };
}

const InputContainerConnected = connect(mapStateToProps)(InputContainer);

export default InputContainerConnected;
