import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from 'react-router';
import HomePage from "./Components/HomePage/HomePage";
import BaseComponent from "./Components/BaseComponent";
import { StoreState } from "./Store/StoreState";

import { loadNavigationElement } from "./ActionCreators/HeaderNavigationElementActionCreators";
import { fetchPosts } from "./ActionCreators/GalleryPostFetchActionCreators";

require('milligram');
require('font-awesome/css/font-awesome');
require("./Global/Styles/global.less");

interface IAppProps extends RouteComponentProps<void> {
    loadNavigationElement?: () => void;
    loadGalleryPost?: () => void;
}

@connect(undefined, mapDispatchToProps)
class App extends BaseComponent<IAppProps, {}> {
    doRender(): React.ReactElement<{}> {
        return (
            <div>
                <HomePage />
            </div>
        );
    }

    componentDidMount(): void {
        this.props.loadNavigationElement();
        this.props.loadGalleryPost();
    }
};

function mapDispatchToProps(dispatch: Dispatch<{}>) {
    return {
        loadNavigationElement: () => dispatch(loadNavigationElement()),
        loadGalleryPost: () => dispatch(fetchPosts('latest', 0, 20))
    };
}

export default App;