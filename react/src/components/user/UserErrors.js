import React from 'react';

function UserErrors({ user }) {
  const errors = [];
  if (user.errors) {
    if (user.errors.name === 'AuthenticationError') {
      errors.push(
        <div key="wrongauth" className="error">
          Wrong username or password
        </div>,
      );
    }
    if (user.errors.name === 'ValidationError') {
      if (user.errors.message.split(' ').includes('unique.')) {
        errors.push(
          <div key="exists" className="error">
            User already exists
          </div>,
        );
      } else {
        errors.push(
          <div key="invalid" className="error">
            Validation error
          </div>,
        );
      }
    }
  }
  return errors || null;
}

export default UserErrors;
