import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ButtonBase, Button } from '@material-ui/core';

import InputField from './InputField';
import UserErrors from './UserErrors';

import '../Form.css';

import { login, reset } from '../../actions/user';

function LoginForm({ handleSubmit, onLogin, user, history, resetUser }) {
  if (user.user) {
    history.push('/');
  }
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
          <div id="submitbutton">
            <Button variant="raised" color="primary" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.any.isRequired,
  resetUser: PropTypes.func.isRequired,
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
    )(LoginForm),
  ),
);
