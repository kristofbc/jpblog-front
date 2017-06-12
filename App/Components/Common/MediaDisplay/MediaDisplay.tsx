import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { StoreState } from "./../../../Store/StoreState";
import BaseComponent from "./../../BaseComponent";
import { mediaLoadStart, mediaLoadCompleted } from "./../../../ActionCreators/MediaDisplayLoadActionCreators";

// tslint:disable-next-line:no-any
const styles: any = require("./MediaDisplay.module.less");

interface MediaDisplayPropInterface {
    color?: string;
    background?: string;
    width?: number;
    height?: number;
    random?: boolean;
    style?: any;

    onMediaLoaded?: () => void;
    loaded?: {[url: string]: boolean };
    loadMedia?: (url:string) => void;
    loadCompleted?: (url:string) => void;
};

@connect(mapStateToProps, mapDispatchToProps)
class MediaDisplay extends BaseComponent<MediaDisplayPropInterface, {}> {

    doRender(): React.ReactElement<{}> {
        console.log('update');
        const loaded = this.props.loaded[this.props.background] != undefined && this.props.loaded[this.props.background] == true;

        const styleContainer: any = this.props.style ? this.props.style : {};
        const styleBackground: any = {};
        if( loaded ) {
            styleBackground.backgroundImage = `url(${this.props.background})`;
        }

        return (
            <div className={[styles.mediaDisplayContainer, loaded ? styles.loaded : styles.loading ].join(' ')} style={styleContainer}>
                <div className={styles.mediaDisplayContainerInner}>
                    <div className={styles.color} style={{ backgroundColor: this.props.color }}></div>
                    <div className={styles.media} style={styleBackground}></div>
                </div>
            </div>
        );
    }

    loadMedia(): void {
        const image = new Image();
        image.onload = () => { this.loadCompleted(); }
        image.src = this.props.background;
    };

    loadCompleted(): void {
        if(this.props.random) {
            // Signal completion randomly (to prevent any flashing)
            setTimeout(() => {
                this.props.loadCompleted(this.props.background);
            }, Math.random()*1000);
        } else {
            this.props.loadCompleted(this.props.background);
        }
    };

    componentDidMount() {
        this.loadMedia();
    };

    shouldComponentUpdate(nextProps:MediaDisplayPropInterface, nextState:MediaDisplayPropInterface) {
        return this.props.background != nextProps.background ||
               (this.props.loaded[this.props.background] == undefined || !this.props.loaded[this.props.background]) && 
               (nextProps.loaded[this.props.background] != undefined && nextProps.loaded[this.props.background])
    };

};

function mapStateToProps(state: StoreState): MediaDisplayPropInterface {
    return {
        loaded: state.mediaDisplay.url
    };
};

function mapDispatchToProps(dispatch: Dispatch<{}>): MediaDisplayPropInterface {
    return {
        loadMedia: (url:string) => dispatch(mediaLoadStart(url)),
        loadCompleted: (url:string) => dispatch(mediaLoadCompleted(url))
    };
}

export default MediaDisplay;