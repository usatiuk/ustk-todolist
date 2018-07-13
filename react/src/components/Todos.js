import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-spring';

import InputContainer from '../containers/InputContainer';
import TodoListContainer from '../containers/TodoListContainer';
import Header from './Header';
import Filters from './Filters';

export default function Todos({ list }) {
  return (
    <div id="todos">
      <Header />
      <Transition
        from={{ opacity: 0, maxHeight: 0 }}
        enter={{ opacity: 1, maxHeight: 38 }}
        leave={{ opacity: 0, maxHeight: 0 }}
      >
        {list && (styles => <InputContainer styles={styles} />)}
      </Transition>
      <TodoListContainer />
      <Transition
        from={{ opacity: 0, maxHeight: 0 }}
        enter={{ opacity: 1, maxHeight: 32 }}
        leave={{ opacity: 0, maxHeight: 0 }}
      >
        {list && Filters}
      </Transition>
    </div>
  );
}

Todos.propTypes = {
  list: PropTypes.bool.isRequired,
};
