import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { StoreState } from "./../../Store/StoreState";

import BaseComponent from "./../BaseComponent";
import Header from "./../Common/Header/Header";
import { formatDate } from "./../../Utils/Date";
import { createThumbnailsGrid, PostThumbnailsGridInterface } from "./../../Utils/Post";

import { dragStart, dragMove, dragStop } from "./../../ActionCreators/HomePagePostMobileDragActionCreator";

// tslint:disable-next-line:no-any
const styles: any = require("./HomePage.module.less");

interface HomePagePropInterface {
    posts?: Post[];
    offset?: number;
    limit?: number;
    selected?: number;
    width?: number;
    height?: number;

    isMobile?: boolean;
    postMobileCoverPosX?: number;
    postMobileCoverPosY?: number;
    postMobileCoverStartX?: number;
    postMobileCoverStartY?: number;
    postMobilePage?:number;
    postMobileCoverDragging?: boolean;
    postMobileOnDragStart?: (posX:number, posY:number) => void;
    postMobileOnDragMove?: (posX:number, posY:number) => void;
    postMobileOnDragStop?: (page:number) => void;
};

interface PostPropInterface {
    tags?: string[];
    title?: string;
    excerpt?: string;
    date?: string;
    readingTime?: number;
    url: string;
    background: string;
    backgroundWidth: number;
    backgroundHeight: number;
    color: string;
    width: number;
    height: number;
    onClick: () => void;
};

interface PostGridPropInterface {
    posts: Post[];
    windowWidth: number;
    windowHeight: number;
};

const PostC = (props:PostPropInterface) => {
    const tags = props.tags.map((t, idx) => {
        return (<li key={`post-tag-${idx}`}>{t}</li>);
    });
    const date = [];
    if(props.date) {
        date.push(props.date)
    }

    return (
        <div 
            className={styles.post}
            style={{
                width: props.width ? props.width : 'auto',
                height: props.height ? props.height : 'auto'
            }}
        >
            <a href={props.url} onClick={(e) => { e.preventDefault(); props.onClick(); }}>
                <div className={styles.postInner}>
                    <div 
                        className={styles.background} 
                        style={{ 
                            backgroundColor: props.color,
                            backgroundImage: `url(${props.background})`
                        }}
                    >
                        {/*<img src={props.background} alt={props.title||''} className={props.backgroundWidth >= props.backgroundHeight ? styles.landscape : styles.portrait} />*/}
                    </div>
                    <div className={styles.cover}></div>
                    <div className={styles.progressBar}></div>
                    <div className={styles.content}>
                        <div className="container">
                            <div className="row">
                                <div className="column">
                                    <div className={styles.tagsContainer}>
                                        {tags.length > 0 && (<ul>{tags}</ul>)}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <div className={styles.titleContainer}>{props.title && (<h3>{props.title}</h3>)}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <div className={styles.excerptContainer}>{props.excerpt && (<h4>{props.excerpt}</h4>)}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <div className={styles.dateContainer}>
                                        {props.date && <h4>{props.date}{props.readingTime && (<span> - <i className="fa fa-clock-o"></i> {props.readingTime} min.</span>)}</h4>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

const PostGrid = (props:PostGridPropInterface) => {
    // Distribute each Post following the linear algorithm to create a nice grid
    const buffers:PostThumbnailsGridInterface[][] = createThumbnailsGrid(props.posts, props.windowHeight/2, props.windowWidth);

    let rows = [];
    for( let i = 0; i < buffers.length; i++ ) {
        rows.push(
            buffers[i].map((size, idx) => {
                const key = `home-page-post-grid-post-${idx}`;
                const post = props.posts[size.idx];
                return createPostComponentFromPostModel(post, {key: key, width: size.resize_width, height: size.resize_height});
            })
        );
    }

    return (
        <div className={styles.postsGridContainer}>
            <div className={styles.postsGridContainerInner}>
                {rows.map(function(thumbs, idx) {
                    const key = `home-page-post-row-${idx}`
                    return (
                        <div 
                            key={key} 
                            style={{ height: buffers[idx][0]["resize_height"] }}
                        >{thumbs}</div>
                    )
                })}
            </div>
        </div>
    )
};

function createPostComponentFromPostModel(p:Post, props:any = {}):React.ReactElement<{PostC}> {
    return (
        <PostC
            background={p.media.url}
            color={p.media.background_color}
            date={p.date && formatDate(p.date)}
            tags={p.tags.map((t) => { return t.title; })}
            title={p.title}
            excerpt={p.excerpt}
            readingTime={p.readingTime}
            url={"#"}
            backgroundWidth={p.media.width}
            backgroundHeight={p.media.height}
            width={props.width ? props.width : 0}
            height={props.height ? props.height : 0}
            onClick={() => {console.log("clckeeedddd")}}
            {...props}
        />
    );
};

@connect(mapStateToProps, mapDispatchToProps)
class HomePage extends BaseComponent<HomePagePropInterface, {}> {
    onPostMobileOnDragStart(posX: number, posY: number):void {
        if( this.props.isMobile && !this.props.postMobileCoverDragging ) {
            const container = ReactDOM.findDOMNode(this.refs['postContainerInner']).getBoundingClientRect();
            this.props.postMobileOnDragStart(posX - container.left, posY - container.top); 
        }
    };
    onPostMobileOnDragMove(posX: number, posY: number):void {
        if( this.props.isMobile && this.props.postMobileCoverDragging ) {
            const container = ReactDOM.findDOMNode(this.refs['postContainerInner']).getBoundingClientRect();
            // Boundary check
            if( container.left > 0 || container.right < 0 ) {
                return;
            } 
            this.props.postMobileOnDragMove(posX, posY); 
        }
    };
    onPostMobileOnDragStop(posX: number, posY: number):void {
        if( this.props.isMobile && this.props.postMobileCoverDragging ) {
            let page = this.props.postMobilePage;
            const container = ReactDOM.findDOMNode(this.refs['postContainerInner']).getBoundingClientRect();
            console.log(this.props.postMobileCoverStartX, posX);
            if( Math.abs(this.props.postMobileCoverStartX - (this.props.postMobilePage*window.innerWidth) - posX) >= window.innerWidth/2 ) {
                page = posX < window.innerWidth/2 ? page+1 : page-1;
            }
            this.props.postMobileOnDragStop(Math.min(Math.max(0,page), 1));
        }
    };

    doRender(): React.ReactElement<{}> {
        return (
            <div>
                <Header navigationElements={[]} search={{}} />
                <div className={[styles.postsContainer, this.props.postMobileCoverDragging ? styles.moving : ''].join(' ')} ref={"postContainer"}>
                    <div 
                        className={styles.postsContainerInner} 
                        style={{ 
                            left: this.props.postMobileCoverDragging && this.props.postMobileCoverPosX != 0 ? this.props.postMobileCoverPosX : -this.props.postMobilePage * window.innerWidth 
                        }} 
                        ref={"postContainerInner"}
                        onMouseDown={(e) => { this.onPostMobileOnDragStart(e.pageX, e.pageY); }}
                        onMouseMove={(e) => { this.onPostMobileOnDragMove(e.pageX, e.pageY); }}
                        onMouseUp={(e) => { this.onPostMobileOnDragStop(e.pageX, e.pageY); }}
                    >
                        <div className={styles.postMobileCoverContainer}>
                            <div className={styles.postMobileCoverContainerInner}>
                                {this.props.posts.length > 0 && createPostComponentFromPostModel(this.props.posts[0])}
                                <div className={styles.postMobileCoverNavigation}>
                                    <ul>
                                        <li><i className="fa fa-circle" /></li>
                                        <li><i className="fa fa-circle-o" /></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <PostGrid 
                            posts={this.props.isMobile && this.props.posts.length > 0 ? this.props.posts.slice(1) : this.props.posts} 
                            windowWidth={this.props.width}
                            windowHeight={this.props.height}
                        />
                    </div>
                </div>
            </div>
        )
    };
};

function mapStateToProps(state: StoreState): HomePagePropInterface {
    return {
        posts: state.galleryPosts.posts,
        limit: state.galleryPosts.limit,
        offset: state.galleryPosts.offset,
        selected: -1,
        width: state.applicationConfiguration.innerWidth,
        height: state.applicationConfiguration.innerHeight,
        isMobile: state.applicationConfiguration.isMobile,

        postMobileCoverStartX: state.homePagePostMobile.startX,
        postMobileCoverStartY: state.homePagePostMobile.startY,
        postMobileCoverPosX: state.applicationConfiguration.isMobile ? state.homePagePostMobile.posX : 0,
        postMobileCoverPosY: state.applicationConfiguration.isMobile ? state.homePagePostMobile.posY : 0,
        postMobilePage: state.applicationConfiguration.isMobile ? state.homePagePostMobile.page : 0,
        postMobileCoverDragging: state.homePagePostMobile.dragging
    };
};

function mapDispatchToProps(dispatch: Dispatch<{}>): HomePagePropInterface {
    return {
        postMobileOnDragStart: (posX:number, posY:number) => dispatch(dragStart(posX, posY)),
        postMobileOnDragMove: (posX:number, posY:number) => dispatch(dragMove(posX, posY)),
        postMobileOnDragStop: (page:number) => dispatch(dragStop(page))
    }
};

export default HomePage;