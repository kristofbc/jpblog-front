import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, match } from 'react-router-dom';
import HomePage from "./Components/HomePage/HomePage";
import Visualizer from "./Components/Common/Visualizer/Visualizer";
import FullscreenLoader from "./Components/Common/FullscreenLoader/FullscreenLoader";
import BaseComponent from "./Components/BaseComponent";
import { StoreState } from "./Store/StoreState";

import { loadNavigationElement } from "./ActionCreators/HeaderNavigationElementActionCreators";
import { fetchPosts } from "./ActionCreators/GalleryPostFetchActionCreators";
import { windowResize, applicationBooted } from "./ActionCreators/ApplicationConfigurationActionCreators";
import { fullscreenLoaderStartLoad, fullscreenLoaderStopLoad } from "./ActionCreators/FullscreenLoaderLoadActionCreators";
import { isMobile, isTablet } from "./Utils/Breakpoint";
import { home, gallerie, is } from "./Utils/Route";
require('milligram');
require('font-awesome/css/font-awesome');
require("./Global/Styles/global.less");

interface IAppProps extends RouteComponentProps<any> {
    innerWidth?: number;
    innerHeight?: number;
    visualizerOpen?: boolean;
    booted?: boolean;
    isMediaLoading?: boolean;
    
    loadNavigationElement?: () => void;
    loadGalleryPost?: () => void;
    resizeApplication?: (innerWidth:number, innerHeight:number, isMobile:boolean, isTablet: boolean) => void;
    fullscreenLoaderStartLoad ?: () => void;
    fullscreenLoaderStopLoad ?: () => void;
    applicationBooted ?: () => void;
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends BaseComponent<IAppProps, {}> {
    doRender(): React.ReactElement<{}> {
        return (
            <div>
                <FullscreenLoader />
                <HomePage />
                <Visualizer match={null} history={null} location={null} />
            </div>
        );
    }

    onWindowResize():void {
        const innerWidth: number = window.innerWidth;
        const innerHeight: number = window.innerHeight;
        // console.log(innerHeight, innerWidth);
        this.props.resizeApplication(innerWidth, innerHeight, isMobile(innerWidth), isTablet(innerWidth));
    };

    componentDidMount(): void {
        this.props.loadNavigationElement();
        // this.props.loadGalleryPost();

        window.addEventListener('resize', () => { this.onWindowResize(); })
    }

    componentWillReceiveProps(nextProps:IAppProps) {
        // Core of the routing
        // if(nextProps.visualizerOpen != this.props.visualizerOpen) {
        //     // It does open automatically
        //     if(!nextProps.visualizerOpen) {
        //         this.props.history.push(home());
        //         // this.props.history.goBack();
        //     }
        // }
        if(!nextProps.booted && !nextProps.isMediaLoading) {
            setTimeout(() => {
                this.props.applicationBooted();
                this.props.fullscreenLoaderStopLoad();
            }, 1000); // Add a slight delay to prevent blinking when the network connection is too fasr
        }
    }
};

function mapStateToProps(state: StoreState, props:IAppProps): IAppProps {
    return {
        visualizerOpen: state.visualizer.open,
        booted: state.applicationConfiguration.booted,
        isMediaLoading: !state.mediaDisplay.ready,

        match: props.match,
        location: props.location,
        history: props.history
    }
}
function mapDispatchToProps(dispatch: Dispatch<{}>) {
    return {
        loadNavigationElement: () => dispatch(loadNavigationElement()),
        loadGalleryPost: () => dispatch(fetchPosts('latest', 0, 20)),
        resizeApplication: (innerWidth:number, innerHeight:number, isMobile:boolean, isTablet:boolean) => dispatch(windowResize(innerWidth, innerHeight, isMobile, isTablet)),
        fullscreenLoaderStartLoad: () => dispatch(fullscreenLoaderStartLoad()),
        fullscreenLoaderStopLoad: () => dispatch(fullscreenLoaderStopLoad()),
        applicationBooted: () => dispatch(applicationBooted())
    };
}

export default App;