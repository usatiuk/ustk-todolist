import * as React from 'react';
import 'normalize.css';
import './App.css';

import InputContainer from './containers/InputContainer';
import TodosContainer from './containers/TodosContainer';
import Header from './components/Header';

export default function App() {
  return (
    <div id="container">
      <Header />
      <InputContainer />
      <TodosContainer />
    </div>
  );
}
