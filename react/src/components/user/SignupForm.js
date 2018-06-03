import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import InputField from './InputField';
import UserErrors from './UserErrors';

import '../Form.css';

import { signup, reset } from '../../actions/user';

function validate(values) {
  const errors = {};
  if (values.password !== values.passwordRepeat) {
    errors.passwordRepeat = 'Invalid';
  }
  return errors;
}

function SignupForm({ handleSubmit, onSignup, user, history, resetUser }) {
  if (user.user) {
    history.push('/');
  }
  return (
    <div>
      <div id="user-header">
        <button
          onClick={() => {
            resetUser();
            history.push('/login');
          }}
        >
          login
        </button>
      </div>
      <div id="form">
        <UserErrors user={user} />
        <form onSubmit={handleSubmit(onSignup)}>
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
          <Field
            label="repeat pasword"
            name="passwordRepeat"
            required
            component={InputField}
            type="password"
          />
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired,
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
    onSignup: ({ username, password }) =>
      dispatch(signup({ username, password })),
  };
}

export default reduxForm({
  form: 'signupForm',
  initialValues: {
    username: '',
    password: '',
    passwordRepeat: '',
  },
  validate,
})(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(SignupForm),
  ),
);
