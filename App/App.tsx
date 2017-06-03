import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from 'react-router';
import BaseComponent from "./Components/BaseComponent";
import { StoreState } from "./Store/StoreState";

require('milligram');
require("./Global/Styles/global.less");

interface IAppProps extends RouteComponentProps<void> {
    loadContent?: () => void;
}

@connect(undefined, mapDispatchToProps)
class App extends BaseComponent<IAppProps, {}> {
    doRender(): React.ReactElement<{}> {
        return (
            <div>
                Hello World
            </div>
        );
    }

    componentDidMount(): void {
        this.props.loadContent();
    }
};

function mapDispatchToProps(dispatch: Dispatch<{}>) {
    return {
        loadContent: () => dispatch(null)
    };
}

export default App;