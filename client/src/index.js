import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import { offline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";

import AppContainer from "./components/AppContainer";
import registerServiceWorker from "./registerServiceWorker";
import todoApp from "./reducers";
import { setToken } from "./actions/util";
import keepSynced from "./middleware/keepSynced";

let store;

const persistCallback = () => {
    const state = store.getState();
    if (state.user.user) {
        setToken(state.user.user.jwt);
    }
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer />
        </Provider>,
        document.getElementById("root"),
    );
};

store = createStore(
    todoApp,
    compose(
        offline({ ...offlineConfig, persistCallback }),
        applyMiddleware(thunk, keepSynced),
    ),
);

registerServiceWorker();
