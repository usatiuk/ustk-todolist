import * as React from "react";
import PropTypes from "prop-types";

import Item from "./Item";

export default function ItemsContainer(props) {
  const items = props.items.map(item => (
    <Item
      key={item.id}
      item={item}
      onClick={() => props.onItemClick(item.list, item.id)}
      handleDelete={() => props.handleDelete(item.list, item.id)}
    />
  ));
  return <ul id="list">{items}</ul>;
}

ItemsContainer.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired
};
