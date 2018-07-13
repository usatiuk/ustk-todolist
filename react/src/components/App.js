import * as React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import './Container.css';
import './App.css';

import MainViewContainer from '../containers/MainViewContainer';
import LoginForm from './user/LoginForm';
import SignupForm from './user/SignupForm';

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
            <Route exact path="/" component={MainViewContainer} />
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignupForm} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
};
