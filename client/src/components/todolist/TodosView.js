import { connect } from 'react-redux';

import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-spring';

import withRouter from 'react-router-dom/withRouter';
import Input from '../todos/Input';
import TodoListContainer from './TodoListContainer';
import Header from '../Header';
import Filters from '../filters/Filters';

class Todos extends React.PureComponent {
  componentDidUpdate() {
    const { user, history } = this.props;
    if (!user.user && !user.dirty) {
      history.replace('/login');
    }
  }

  render() {
    const { list } = this.props;
    return (
      <div id="todos">
        <Header />
        <Transition
          from={{ opacity: 0, maxHeight: 0 }}
          enter={{ opacity: 1, maxHeight: 38 }}
          leave={{ opacity: 0, maxHeight: 0 }}
        >
          {list && (styles => <Input styles={styles} />)}
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
}

Todos.propTypes = {
  list: PropTypes.bool.isRequired,
  user: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};

function mapStateToProps(state) {
  return {
    list: Boolean(state.lists.list),
    user: state.user,
  };
}

export default withRouter(connect(mapStateToProps)(Todos));
