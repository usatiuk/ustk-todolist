import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ButtonBase, Button } from '@material-ui/core';

import InputField from './InputField';
import UserErrors from './UserErrors';

import './Form.css';

import { edit, resetEdit, deleteUser } from '../../actions/user';

function validate(values) {
  const errors = {};
  if (values.password !== values.passwordRepeat) {
    errors.passwordRepeat = 'Passwords should match';
  }
  return errors;
}

function EditForm({
  handleSubmit,
  onSubmit,
  deleteUser,
  user,
  history,
  reset,
}) {
  if (!user.user) {
    history.push('/');
  }
  console.log(user);
  if (user.user && user.editSuccess) {
    reset();
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
            history.push('/');
          }}
        >
          todos
        </ButtonBase>
      </div>
      <div id="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <UserErrors user={user} />
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
          <div id="buttons">
            <Button onClick={() => deleteUser()}>Delete your account</Button>
            <Button
              id="submitbutton"
              variant="raised"
              color="primary"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

EditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.any.isRequired,
  reset: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: () => dispatch(resetEdit()),
    deleteUser: () => dispatch(deleteUser()),
    onSubmit: ({ username, password }) =>
      dispatch(edit({ username, password })),
  };
}

export default reduxForm({
  form: 'editForm',
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
    )(EditForm),
  ),
);
