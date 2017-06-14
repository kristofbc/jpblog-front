import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { StoreState } from "./../../../Store/StoreState";
import BaseComponent from "./../../BaseComponent";

// tslint:disable-next-line:no-any
const styles: any = require("./FullscreenLoader.module.less");

interface FullscreenLoaderPropInterface {
    active?:boolean;
};


@connect(mapStateToProps, null)
export default class FullscreenLoader extends BaseComponent<FullscreenLoaderPropInterface, {}> {

    doRender(): React.ReactElement<{}> {
        return (
            <div className={[ styles.fullscreenLoaderContainer, this.props.active ? styles.active : styles.inactive ].join(' ')}>
                <div className={styles.fullscreenLoaderContainerInner}>
                    <div className={[styles.logoContainer, this.props.active ? styles.loading : ''].join(' ')}>
                        <div className={styles.logoContainerInner}>
                            <div className={styles.hideTopLeft}></div>
                            <div className={styles.hideTopBottom}></div>
                            <div className={styles.hideBottomTop}></div>
                            <div className={styles.hideBottomLeft}></div>
                            <p className={styles.text}>Krstf<span>.io</span></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


function mapStateToProps(state: StoreState): FullscreenLoaderPropInterface {
    return {
       active: state.fullscreenLoader.active 
    }
}