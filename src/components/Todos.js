import React from 'react';
import { Redirect } from 'react-router-dom';

import InputContainer from '../containers/InputContainer';
import TodoListContainer from '../containers/TodoListContainer';
import Header from './Header';

export default function Todos({ user, loadLists, history }) {
  if (user.dirty) {
    return <div>loading</div>;
  }
  if (user.user) {
    loadLists();
  } else {
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
