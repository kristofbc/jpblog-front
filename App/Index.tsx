import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from "./App";
import Static from "./Static";
import { configureStore } from "./Store/CreateStore";
import { home, gallerie, image } from "./Utils/Route";

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path={home()} component={App} />
                <Route path={home(":page")} component={App} />
                {/*<Route path={gallerie()} component={App} />*/}
                <Route path={gallerie(':slug')} component={App} />
                <Route exact path={image(':imageId')} component={Static} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);