import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ButtonBase, Button } from '@material-ui/core';

import InputField from './InputField';
import UserErrors from './UserErrors';

import '../Form.css';

import { signup, reset } from '../../actions/user';

function validate(values) {
  const errors = {};
  if (values.password !== values.passwordRepeat) {
    errors.passwordRepeat = 'Passwords should match';
  }
  return errors;
}

function SignupForm({ handleSubmit, onSignup, user, history, resetUser }) {
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
            history.push('/login');
          }}
        >
          login
        </ButtonBase>
      </div>
      <div id="form">
        <form onSubmit={handleSubmit(onSignup)}>
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
          <Field
            label="repeat pasword"
            name="passwordRepeat"
            required
            component={InputField}
            type="password"
          />
          <div id="buttons">
            <Button
              id="submitbutton"
              variant="raised"
              color="primary"
              type="submit"
            >
              Signup
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
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
