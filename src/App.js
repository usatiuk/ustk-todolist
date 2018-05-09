import * as React from "react";
import "./App.css";

import InputContainer from "./containers/InputContainer";
import ItemsContainer from "./containers/ItemsContainer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputBottomBorder: true,
      inputFieldValue: "",
      items: [
        { id: 1, text: "hello1", crossed: false },
        { id: 2, text: "hello2", crossed: false },
        { id: 3, text: "hello3", crossed: false }
      ]
    };
    this.addToList = this.addToList.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.addToList = this.addToList.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
  }

  render() {
    return (
      <div id="container">
        <h1>To-Do List</h1>
        <InputContainer
          value={this.state.inputFieldValue}
          onInputChange={this.onInputChange}
          inputBottomBorder={this.state.inputBottomBorder}
          onClick={this.addToList}
        />
        <ItemsContainer
          items={this.state.items}
          onItemClick={this.onItemClick}
          handleDelete={this.removeFromList}
        />
      </div>
    );
  }

  addToList() {
    if (!this.state.inputFieldValue.trim()) {
      return;
    }
    const { items } = this.state;
    items.unshift({
      crossed: false,
      id: items.length + 1,
      text: this.state.inputFieldValue.trim()
    });
    this.setState(
      {
        inputFieldValue: "",
        items
      },
      () => {
        this.updateInputBorder();
      }
    );
  }
  removeFromList(id) {
    const { items } = this.state;
    const newItems = items.filter(item => item.id !== id);
    this.setState(
      {
        items: newItems
      },
      () => {
        this.updateInputBorder();
      }
    );
  }

  onInputChange(inputFieldValue) {
    this.setState({ inputFieldValue });
  }

  updateInputBorder() {
    this.state.items.length === 0
      ? this.setState({ inputBottomBorder: false })
      : this.setState({ inputBottomBorder: true });
  }

  onItemClick(id) {
    const { items } = this.state;
    items.some((item, i) => {
      if (item.id === id) {
        const newItem = { ...item };
        newItem.crossed = !item.crossed;
        items[i] = newItem;
        return true;
      } else {
        return false;
      }
    });
    this.setState({
      items
    });
  }
}

export default App;
