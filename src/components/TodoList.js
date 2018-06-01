import * as React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-spring';

import Todo from './Todo';

export default function TodosContainer({
  todos,
  toggleTodo,
  removeTodo,
  editTodo,
}) {
  return (
    <ul id="list">
      <Transition
        native
        items={todos}
        keys={todo => todo.id}
        from={{ height: 0, borderColor: '#f0f0f0', opacity: 0.9 }}
        enter={{ height: 60, borderColor: '#f0f0f0', opacity: 1 }}
        leave={{ height: 0, borderColor: '#ffffff', opacity: 0.5 }}
      >
        {todos.map(todo => styles => (
          <Todo
            key={todo.id}
            todo={todo}
            style={styles}
            toggleTodo={() => toggleTodo(todo.id)}
            removeTodo={() => removeTodo(todo.id)}
            editTodo={text => editTodo(todo.id, text)}
          />
        ))}
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
