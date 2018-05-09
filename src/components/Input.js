import * as React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const classes = [];

    if (!this.props.inputBottomBorder) {
      classes.push("no-border");
    }

    return (
      <div id="inputs" className={classes.join(" ")}>
        <input
          id="input"
          type="text"
          value={this.props.value}
          onChange={this.handleChange}
        />
        <button id="add" onClick={this.props.onClick}>
          add
        </button>
      </div>
    );
  }
  handleChange(event) {
    this.props.onInputChange(event.target.value);
  }
}

export default Input;
