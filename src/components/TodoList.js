import * as React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-spring';

import Todo from './Todo';

export default function TodosContainer(props) {
  const todos = props.todos.map(todo => styles => (
    <Todo
      key={todo.id}
      todo={todo}
      style={styles}
      toggleTodo={() => props.toggleTodo(todo.id)}
      removeTodo={() => props.removeTodo(todo.id)}
      editTodo={text => props.editTodo(todo.id, text)}
    />
  ));
  return (
    <ul id="list">
      <Transition
        keys={props.todos.map(todo => todo.id)}
        from={{ maxHeight: 0 }}
        enter={{ maxHeight: 100 }}
        leave={{ maxHeight: 0 }}
      >
        {todos}
      </Transition>
    </ul>
  );
}

TodosContainer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  removeTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
