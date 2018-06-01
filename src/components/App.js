import * as React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'normalize.css';
import '../App.css';

import TodosContainer from '../containers/TodosContainer';
import LoginForm from '../components/user/LoginForm';
import SignupForm from '../components/user/SignupForm';

export default class App extends React.Component {
  componentWillMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <Router>
        <div id="container">
          <Route exact path="/" component={TodosContainer} />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
};
