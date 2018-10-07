import * as React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Loadable from 'react-loadable';

import './Container.css';
import './App.css';

function Loading(props) {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}

const LoadableTodosView = Loadable({
  loader: () => import('./todolist/TodosView'),
  loading: () => Loading,
  delay: 1000,
});

const LoadableLoginForm = Loadable({
  loader: () => import('./user/LoginForm'),
  loading: () => Loading,
  delay: 1000,
});

const LoadableSignupForm = Loadable({
  loader: () => import('./user/SignupForm'),
  loading: () => Loading,
  delay: 1000,
});

const LoadableEditView = Loadable({
  loader: () => import('./user/EditForm'),
  loading: () => Loading,
  delay: 1000,
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
            <Route path="/edit" component={LoadableEditView} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
};
