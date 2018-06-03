import React from 'react';
import PropTypes from 'prop-types';

export default function InputField({
  required,
  input,
  label,
  meta: { touched, error },
  type,
}) {
  return (
    <div>
      <label htmlFor={input.name}>
        {label} <input required={required} {...input} type={type} />
      </label>
      {touched && error && <span className="error">{error}</span>}
    </div>
  );
}

InputField.propTypes = {
  required: PropTypes.bool.isRequired,
  input: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};
