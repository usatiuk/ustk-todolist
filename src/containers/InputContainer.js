import * as React from "react";

import Input from "../components/Input";

export default function InputContainer(props) {
  return (
    <Input
      value={props.value}
      onInputChange={props.onInputChange}
      inputBottomBorder={props.inputBottomBorder}
      onClick={props.onClick}
    />
  );
}
