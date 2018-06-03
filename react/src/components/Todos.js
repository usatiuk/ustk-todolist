import React from 'react';
import PropTypes from 'prop-types';

import InputContainer from '../containers/InputContainer';
import TodoListContainer from '../containers/TodoListContainer';
import Header from './Header';

export default function Todos({ user, loadLists, history }) {
  if (user.user) {
    loadLists();
  } else if (!user.dirty) {
    history.push('/login');
  }
  return (
    <div id="todos">
      <Header />
      <InputContainer />
      <TodoListContainer />
    </div>
  );
}

Todos.propTypes = {
  loadLists: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
