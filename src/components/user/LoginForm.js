import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputField from './InputField';

import '../Form.css';
import UserErrors from './UserErrors';

import { login, reset } from '../../actions/user';

function LoginForm({ handleSubmit, onLogin, user, history, resetUser }) {
  if (user.user) {
    history.push('/');
  }
  return (
    <div>
      <div id="user-header">
        <button
          onClick={() => {
            resetUser();
            history.push('/signup');
          }}
        >
          signup
        </button>
      </div>
      <div id="form">
        <UserErrors user={user} />
        <form onSubmit={handleSubmit(onLogin)}>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
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
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm)));
