import * as React from "react";
import "./App.css";

import InputContainer from "./containers/InputContainer";
import ItemsContainer from "./containers/ItemsContainer";
import Header from "./components/Header";

export default function App() {
  return (
    <div id="container">
      <Header />
      <InputContainer />
      <ItemsContainer />
    </div>
  );
}
