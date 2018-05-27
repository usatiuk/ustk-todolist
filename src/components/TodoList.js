import * as React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';

export default function TodosContainer(props) {
  const todos = props.todos.map(todo => (
    <Todo
      key={todo.id}
      todo={todo}
      onClick={() => props.onTodoClick(todo.id)}
      handleDelete={() => props.handleDelete(todo.id)}
    />
  ));
  return <ul id="list">{todos}</ul>;
}

TodosContainer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  handleDelete: PropTypes.func.isRequired,
  onTodoClick: PropTypes.func.isRequired,
};
