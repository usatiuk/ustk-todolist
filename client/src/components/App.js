import * as React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Loadable from 'react-loadable';

import './Container.css';
import './App.css';

const LoadableTodosView = Loadable({
  loader: () => import('./todolist/TodosView'),
  loading: () => <span>loading</span>,
  delay: 200,
});

const LoadableLoginForm = Loadable({
  loader: () => import('./user/LoginForm'),
  loading: () => <span>loading</span>,
  delay: 200,
});

const LoadableSignupForm = Loadable({
  loader: () => import('./user/SignupForm'),
  loading: () => <span>loading</span>,
  delay: 200,
});

export default class App extends React.PureComponent {
  componentDidMount() {
    const { loadUser } = this.props;
    loadUser();
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div id="container">
            <Route exact path="/" component={LoadableTodosView} />
            <Route path="/login" component={LoadableLoginForm} />
            <Route path="/signup" component={LoadableSignupForm} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
};
