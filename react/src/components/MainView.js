import React from 'react';
import PropTypes from 'prop-types';
import TodosContainer from '../containers/TodosContainer';

export default class MainView extends React.PureComponent {
  componentDidUpdate() {
    const { user, history } = this.props;
    if (!user.user && !user.dirty) {
      history.replace('/login');
    }
  }

  render() {
    return <TodosContainer />;
  }
}

MainView.propTypes = {
  user: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};
