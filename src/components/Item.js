import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    const deleteClasses = ["delete"];
    if (!this.state.hover) {
      deleteClasses.push("disabled");
    }

    const itemClasses = ["item"];
    if (this.props.item.crossed) {
      itemClasses.push("done");
    }

    return (
      <li
        onMouseOver={this.onMouseOver}
        onFocus={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onBlur={this.onMouseOut}
      >
        <div className={deleteClasses.join(" ")} onClick={this.handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div className={itemClasses.join(" ")} onClick={this.onClick}>
          {this.props.item.text}
        </div>
      </li>
    );
  }

  handleDelete(event) {
    this.props.handleDelete(this.props.item.id);
  }
  onClick(event) {
    this.props.onClick(this.props.item.id);
  }
  onMouseOver() {
    this.setState({
      hover: true
    });
  }

  onMouseOut() {
    this.setState({
      hover: false
    });
  }
}

export default Item;
