import * as React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-spring';

import Todo from './Todo';

export default function TodosContainer(props) {
  return (
    <ul id="list">
      <Transition
        native
        items={props.todos}
        keys={todo => todo.id}
        from={todo => ({ height: 0, borderColor: '#ffffff', opacity: 0.9 })}
        enter={todo => ({ height: 60, borderColor: '#dddddd', opacity: 1 })}
        leave={todo => ({ height: 0, borderColor: '#ffffff', opacity: 0.5 })}
      >
        {props.todos.map(todo => styles => (
          <Todo
            key={todo.id}
            todo={todo}
            style={styles}
            toggleTodo={() => props.toggleTodo(todo.id)}
            removeTodo={() => props.removeTodo(todo.id)}
            editTodo={text => props.editTodo(todo.id, text)}
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
