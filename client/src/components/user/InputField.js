import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

export default function InputField({
    required,
    input,
    label,
    meta: { touched, error },
    type,
}) {
    return (
        <React.Fragment>
            <TextField
                label={label}
                required={required}
                {...input}
                type={type}
                style={{ marginBottom: "1rem" }}
            />
            {touched && error && <span className="error">{error}</span>}
        </React.Fragment>
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
