import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import AppContainer from './containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';
import todoApp from './reducers';

const store = createStore(todoApp, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
