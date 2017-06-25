import { createStore, applyMiddleware, compose, Store, Middleware, Reducer } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./../Reducers/RootReducer";
import { StoreState } from "./StoreState";

export function configureStore(initialState?: StoreState): Store<StoreState> {
    const middlewares: Middleware[] = [
        thunkMiddleware
    ];

    const composeEnhancers =
        DEBUG && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

    if (process.env.NODE_ENV !== 'production') {
        // middlewares.push(createLogger())
    };

    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares),
    ));

    if (module.hot) {
        module.hot.accept("./../Reducers/RootReducer", () => {
            store.replaceReducer((require("./../Reducers/RootReducer") as Reducer<StoreState>));
        });
    }

    return store;
}