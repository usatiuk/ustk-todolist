import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../components/Input';
import { addTodo } from '../actions';
import getVisibleTodos from './getVisibleTodos';

const InputContainer = props => (
  <Input
    inputBottomBorder={props.inputBottomBorder}
    onClick={text => props.dispatch(addTodo(text))}
  />
);

InputContainer.propTypes = {
  inputBottomBorder: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { list } = state.lists;
  try {
    const listTodos = state.lists.lists[list].todos;
    return {
      list,
      inputBottomBorder: getVisibleTodos(listTodos, state.visibilityFilter).length !== 0,
    };
  } catch (e) {
    return {
      list,
      inputBottomBorder: false,
    };
  }
}

const InputContainerConnected = connect(mapStateToProps)(InputContainer);

export default InputContainerConnected;
