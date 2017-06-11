import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, match } from 'react-router';
import HomePage from "./Components/HomePage/HomePage";
import BaseComponent from "./Components/BaseComponent";
import { StoreState } from "./Store/StoreState";

import { loadNavigationElement } from "./ActionCreators/HeaderNavigationElementActionCreators";
import { fetchPosts } from "./ActionCreators/GalleryPostFetchActionCreators";
import { windowResize } from "./ActionCreators/ApplicationConfigurationActionCreators";
import { isMobile, isTablet } from "./Utils/Breakpoint";

require('milligram');
require('font-awesome/css/font-awesome');
require("./Global/Styles/global.less");

interface IAppProps extends RouteComponentProps<Object> {
    innerWidth?: number;
    innerHeight?: number;
    
    loadNavigationElement?: () => void;
    loadGalleryPost?: () => void;
    resizeApplication?: (innerWidth:number, innerHeight:number, isMobile:boolean, isTablet: boolean) => void;
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

    onWindowResize():void {
        const innerWidth: number = window.innerWidth;
        const innerHeight: number = window.innerHeight;
        this.props.resizeApplication(innerWidth, innerHeight, isMobile(innerWidth), isTablet(innerWidth));
    };

    componentDidMount(): void {
        this.props.loadNavigationElement();
        this.props.loadGalleryPost();

        window.addEventListener('resize', () => { this.onWindowResize(); })
    }
};

function mapDispatchToProps(dispatch: Dispatch<{}>) {
    return {
        loadNavigationElement: () => dispatch(loadNavigationElement()),
        loadGalleryPost: () => dispatch(fetchPosts('latest', 0, 20)),
        resizeApplication: (innerWidth:number, innerHeight:number, isMobile:boolean, isTablet:boolean) => dispatch(windowResize(innerWidth, innerHeight, isMobile, isTablet))
    };
}

export default App;