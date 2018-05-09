import * as React from "react";

import Item from "../components/Item";

export default class ItemsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.items.map(item => (
      <Item
        key={item.id}
        item={item}
        onClick={this.props.onItemClick}
        handleDelete={this.props.handleDelete}
      />
    ));
    return <ul id="list">{items}</ul>;
  }
}
