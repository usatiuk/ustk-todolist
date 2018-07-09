import React from 'react';
import PropTypes from 'prop-types';

import InputContainer from '../containers/InputContainer';
import TodoListContainer from '../containers/TodoListContainer';
import Header from './Header';
import Filters from './Filters';

export default class Todos extends React.PureComponent {
  componentDidUpdate() {
    if (!this.props.user.user && !this.props.user.dirty) {
      this.props.history.replace('/login');
    }
  }
  render() {
    return (
      <div id="todos">
        <Header />
        <InputContainer />
        <TodoListContainer />
        <Filters />
      </div>
    );
  }
}

Todos.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
