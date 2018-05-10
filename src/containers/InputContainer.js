import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Input from "../components/Input";
import { addItem } from "../actions";

const InputContainer = props => (
  <Input
    inputBottomBorder={props.inputBottomBorder}
    onClick={text => props.dispatch(addItem(text))}
  />
);

InputContainer.propTypes = {
  inputBottomBorder: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    inputBottomBorder: state.items.length !== 0
  };
}

const InputContainerConnected = connect(mapStateToProps)(InputContainer);

export default InputContainerConnected;
