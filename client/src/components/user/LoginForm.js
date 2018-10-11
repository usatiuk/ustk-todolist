import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ButtonBase, Button } from '@material-ui/core';
import { withRouter } from 'react-router';

import InputField from './InputField';
import UserErrors from './UserErrors';

import './Form.css';

import { login, reset, loginJWT } from '../../actions/user';

class LoginForm extends React.PureComponent {
  componentDidMount() {
    const { setJWT } = this.props;
    const params = new URLSearchParams(new URL(window.location).search);
    if (params.has('jwt')) {
      const jwt = params.get('jwt');
      setJWT(jwt);
    }
  }

  render() {
    const { resetUser, history, handleSubmit, user, onLogin } = this.props;
    return (
      <React.Fragment>
        <div id="user-header">
          <ButtonBase
            style={{
              marginRight: '1rem',
              padding: '0 0.5rem',
              borderRadius: '7px',
            }}
            onClick={() => {
              resetUser();
              history.push('/signup');
            }}
          >
            signup
          </ButtonBase>
        </div>
        <div id="form">
          <form onSubmit={handleSubmit(onLogin)}>
            <UserErrors user={user} />
            <Field
              label="username"
              name="username"
              required
              component={InputField}
              type="text"
            />
            <Field
              label="password"
              name="password"
              required
              component={InputField}
              type="password"
            />

            <div id="buttons">
              <Button
                id="googlebutton"
                variant="raised"
                onClick={() => {
                  window.location = '/__/users/login/google/';
                }}
              >
                Google
              </Button>
              <Button
                id="submitbutton"
                variant="raised"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.any.isRequired,
  resetUser: PropTypes.func.isRequired,
  setJWT: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetUser: () => dispatch(reset()),
    onLogin: ({ username, password }) =>
      dispatch(login({ username, password })),
    setJWT: jwt => dispatch(loginJWT(jwt)),
  };
}

export default reduxForm({
  form: 'loginForm',
  initialValues: {
    username: '',
    password: '',
  },
})(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(LoginForm)
  ),
);
