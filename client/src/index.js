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

const store = createStore(
    todoApp,
    compose(
        offline({ ...offlineConfig, persistCallback: () => {
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
        }
        }),
        applyMiddleware(thunk, keepSynced),
    ),
);

registerServiceWorker();
