import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signup } from '../../actions/user';

function validate(values) {
  const errors = {};
  if (values.username === '') {
    errors.username = 'should have username';
  }
  if (values.password !== values.passwordRepeat) {
    errors.passwordRepeat = 'Invalid';
  }
  return errors;
}

const InputField = ({
  input, label, meta: { touched, error }, type,
}) => (
  <div>
    <label htmlFor={input.name}>
      {label} <input {...input} type={type} />
    </label>
    {touched && error && <span className="error">{error}</span>}
  </div>
);

function SignupForm({
  handleSubmit, signup, user, history,
}) {
  let errors;
  if (user.errors) {
    if (user.errors.name === 'AuthenticationError') {
      errors = <div>Wrong username or password</div>;
    }
  }
  if (user.user) {
    history.push('/');
  }
  return (
    <div id="signup--form">
      {errors}
      <form onSubmit={handleSubmit(signup)}>
        <Field
          label="username"
          name="username"
          component={InputField}
          type="text"
        />
        <Field
          label="password"
          name="password"
          component={InputField}
          type="password"
        />
        <Field
          label="repeat pasword"
          name="passwordRepeat"
          component={InputField}
          type="password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signup: ({ username, password }) =>
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
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupForm)));
