import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import App from "./App";
import { configureStore } from "./Store/CreateStore";
import { home, gallerie } from "./Utils/Route";

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path={home()} component={App} />
                {/*<Route path="/page/:number" component={App} />*/}
                <Route path={gallerie()} component={App} />
                <Route path={gallerie(':slug')} component={App} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);