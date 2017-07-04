import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, match } from 'react-router-dom';
import BaseComponent from "./Components/BaseComponent";
import { StoreState } from "./Store/StoreState";

import { fetchPost } from "./ActionCreators/PostFetchActionCreators"

// tslint:disable-next-line:no-any
const styles: any = require("./Global/Styles/static.less");

interface StaticPropsInterface extends RouteComponentProps<any> {
    imageId?: number;
    imagePath?: string;
    imageTitle?: string;

    fetchPost?: (id:number) => void;
};

@connect(mapStateToProps, mapDispatchToProps)
class Static extends BaseComponent<StaticPropsInterface, {}> {
    doRender(): React.ReactElement<{}> {
        return(
            <div>
                <div className={"staticContainer"}>
                    <img src={this.props.imagePath} alt={this.props.imageTitle} />
                </div>
            </div>
        );
    };

    componentWillReceiveProps(nextProps:StaticPropsInterface) {
        if(nextProps.imagePath == "") {
            this.props.fetchPost(nextProps.imageId);
        }
    };
    
    componentDidMount() {
       if(this.props.imagePath == "") {
            this.props.fetchPost(this.props.imageId);
       } 
    };
}


function mapStateToProps(state: StoreState, props:StaticPropsInterface): StaticPropsInterface {
    return {
        imageId: props.match.params.imageId,
        imagePath: state.staticPost.post != null ? state.staticPost.post.media.url : "",
        imageTitle: state.staticPost.post != null ? state.staticPost.post.title : "",

        match: props.match,
        location: props.location,
        history: props.history
    }
}
function mapDispatchToProps(dispatch: Dispatch<{}>) {
    return {
        fetchPost: (id:number) => dispatch(fetchPost(id))
    };
}

export default Static;