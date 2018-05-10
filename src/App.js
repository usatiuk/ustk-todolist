import * as React from "react";
import "./App.css";

import InputContainer from "./containers/InputContainer";
import ItemsContainer from "./containers/ItemsContainer";

export default function App() {
  return (
    <div id="container">
      <h1>To-Do List</h1>
      <InputContainer />
      <ItemsContainer />
    </div>
  );
}
