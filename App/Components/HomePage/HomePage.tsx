import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { StoreState } from "./../../Store/StoreState";

import BaseComponent from "./../BaseComponent";
import Header from "./../Common/Header/Header";

// tslint:disable-next-line:no-any
const styles: any = require("./HomePage.module.less");

interface HomePagePropInterface {

};

class HomePage extends BaseComponent<HomePagePropInterface, {}> {
    doRender(): React.ReactElement<{}> {
        return (
            <div>
                <Header navigationElements={[]} search={{}} />
            </div>
        )
    }
};

function mapStateToProps(state: StoreState): HomePagePropInterface {
    return {

    };
};

function mapDispatchToProps(dispatch: Dispatch<{}>): HomePagePropInterface {
    return {

    }
};

export default HomePage;