import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";

import { StoreState } from "./../../Store/StoreState";
import { RouteComponentProps, match } from 'react-router-dom';

import BaseComponent from "./../BaseComponent";
import Header from "./../Common/Header/Header";
import MediaDisplay from "./../Common/MediaDisplay/MediaDisplay";
import Visualizer from "../../Components/Common/Visualizer/Visualizer";

import { formatDate } from "./../../Utils/Date";
import { is, home, gallerie, image } from "./../../Utils/Route";
import { createThumbnailsGrid } from "./../../Utils/Post";

import { dragStart, dragMove, dragStop } from "./../../ActionCreators/HomePagePostMobileDragActionCreator";
import { setMap } from "./../../ActionCreators/HomePagePostThumbnailsActionCreator";
import { visualizerOpen } from "./../../ActionCreators/VisualizerActionCreators"
import { fetchPosts } from "./../../ActionCreators/GalleryPostFetchActionCreators"

// tslint:disable-next-line:no-any
const styles: any = require("./HomePage.module.less");

interface HomePagePropInterface extends RouteComponentProps<any> {
    posts?: Post[];
    offset?: number;
    limit?: number;
    selected?: number;
    width?: number;
    height?: number;
    headerHeight?: number;
    fetchingPost?: boolean;
    postEnd?: boolean;
    postsGrid?: PostThumbnailsGrid[][];
    isVisualizerOpen?: boolean;

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

    openVisualizer?: (posts:Post[], index: number) => void;
    loadGalleryPost?: (order:string, offset:number, limit:number) => void;
    setPostsGridMap?: (map:PostThumbnailsGrid[][]) => void;
};

interface PostPropInterface {
    id: number;
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
    isMobile: boolean;
    onClick: (id:number, event:any) => void;
};

interface PostGridPropInterface {
    posts: Post[];
    windowWidth: number;
    windowHeight: number;
    offsetTop: number;
    grid: PostThumbnailsGrid[][];
    isVisualizerOpen: boolean;
    isMobile: boolean;
    onPostSelected: (id:number) => void;
    onScroll:(e) => void;
};

const PostC = (props:PostPropInterface) => {
    const tags = props.tags.map((t, idx) => {
        return (<li key={`post-tag-${idx}`}>#{t}</li>);
    });
    const date = [];
    if(props.date) {
        date.push(props.date)
    }

    const postInner = (
        <div className={styles.postInner}>
            <MediaDisplay color={props.color} background={props.background} random={true} />
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
    );

    let postInnerWrapper = null;
    if(!props.isMobile) {
        postInnerWrapper = (
            <Link to={props.url} onClick={(e) => { /* e.preventDefault(); */ props.onClick(props.id, e); }}>
                {postInner}
            </Link>
        );
    } else {
        postInnerWrapper = (
            <a href={image(props.id)} target="_blank" onClick={(e) => { /* e.preventDefault(); */ props.onClick(props.id, e); }}>
                {postInner}
            </a>
        );
    }

    return (
        <div 
            className={styles.post}
            style={{
                width: props.width ? props.width : 'auto',
                height: props.height ? props.height : 'auto'
            }}
        >{postInnerWrapper}</div>
    );
};

const PostGrid = (props:PostGridPropInterface) => {
    // Distribute each Post following the linear algorithm to create a nice grid
    const distributed = props.grid.map((r) => { return r.length; }).reduce((prev, next) => { return prev+next; }, 0);
    let buffers:PostThumbnailsGrid[][] = [];
    if(distributed != props.posts.length) {
        buffers = createThumbnailsGrid(props.posts, props.windowHeight/2, props.windowWidth);
    } else {
        buffers = props.grid;
    }

    let rows = [];
    for( let i = 0; i < buffers.length; i++ ) {
        rows.push(
            buffers[i].map((size, idx) => {
                const key = `home-page-post-grid-post-${idx}`;
                const post = props.posts[size.idx];
                return createPostComponentFromPostModel(post, {key: key, width: size.resize_width, height: size.resize_height, onClick: props.onPostSelected, isMobile: props.isMobile});
            })
        );
    }

    return (
        <div onScroll={props.onScroll} className={[styles.postsGridContainer, styles.visualizerClosed].join(' ')} style={{ top: props.offsetTop, height: props.windowHeight }}>
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
            id={p.id}
            background={p.media.url}
            color={p.media.background_color}
            date={p.date && formatDate(p.date)}
            tags={p.tags.map((t) => { return t.title; })}
            title={p.title}
            excerpt={p.excerpt}
            readingTime={p.readingTime}
            url={gallerie(p.id)}
            backgroundWidth={p.media.width}
            backgroundHeight={p.media.height}
            width={props.width ? props.width : 0}
            height={props.height ? props.height : 0}
            onClick={props.onClick}
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
            // Only one scroll direction at a time
            // Scroll Y is handled by overflow
            if( this.props.postMobilePage != 0 && this.props.postMobileCoverStartY != posY ) {
                return;
            }
            this.props.postMobileOnDragMove(posX, posY); 
        }
    };
    onPostMobileOnDragStop(posX: number, posY: number):void {
        if( this.props.isMobile && this.props.postMobileCoverDragging ) {
            let page = this.props.postMobilePage;
            const container = ReactDOM.findDOMNode(this.refs['postContainerInner']).getBoundingClientRect();
            // console.log(this.props.postMobileCoverStartX, posX);
            if( Math.abs(this.props.postMobileCoverStartX - (this.props.postMobilePage*window.innerWidth) - posX) >= window.innerWidth/2 ) {
                page = posX < window.innerWidth/2 ? page+1 : page-1;
            }
            this.props.postMobileOnDragStop(Math.min(Math.max(0,page), 1));
        }
    };
    onPostGalleryScroll(e):void {
        // The post should be there when the user scroll: no waiting time
        if(!this.props.postEnd && !this.props.fetchingPost && e.target.scrollTop + e.target.offsetHeight > e.target.scrollHeight/2) {
            this.props.loadGalleryPost('latest', this.props.offset + this.props.limit, this.props.limit);
        }
    };
    doRender(): React.ReactElement<{}> {
        return (
            <div>
                <Header 
                    navigationElements={[]} 
                    search={{}} 
                />
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
                        onTouchStart={(e) => { this.onPostMobileOnDragStart(e.touches[0].pageX, e.touches[0].pageY); }}
                        onTouchMove={(e) => { this.onPostMobileOnDragMove(e.touches[0].pageX, e.touches[0].pageY); }}
                        onTouchEnd={(e) => { this.onPostMobileOnDragStop(e.changedTouches[0].pageX, e.changedTouches[0].pageX); }}
                        onTouchCancel={(e) => { this.onPostMobileOnDragStop(e.changedTouches[0].pageX, e.changedTouches[0].pageX); }}
                    >
                        <div className={styles.postMobileCoverContainer}>
                            <div className={styles.postMobileCoverContainerInner}>
                                {this.props.posts.length > 0 && createPostComponentFromPostModel(this.props.posts[0], {onClick: (id:number, e) => {
                                    // Don't open the cover
                                    e.preventDefault()
                                    {/*console.log("open cover");*/}
                                }, isMobile: this.props.isMobile})}
                                <div className={styles.postMobileCoverNavigation}>
                                    <ul>
                                        <li><i className="fa fa-circle" /></li>
                                        <li><i className="fa fa-circle-o" /></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <PostGrid
                            isVisualizerOpen={this.props.isVisualizerOpen}
                            grid={this.props.postsGrid}
                            onScroll={(e) => { this.onPostGalleryScroll(e); }}
                            posts={this.props.isMobile && this.props.posts.length > 0 ? this.props.posts.slice(1) : this.props.posts} 
                            offsetTop={this.props.headerHeight}
                            windowWidth={this.props.width}
                            windowHeight={this.props.height}
                            isMobile={this.props.isMobile}
                            onPostSelected={(id:number) => {
                                {/*for(var i = 0; i < this.props.posts.length; i++) {
                                    if(this.props.posts[i].id == id) {
                                        this.props.openVisualizer(this.props.posts, i)
                                        break;
                                    }
                                }*/}
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    };

    componentWillReceiveProps(nextProps:HomePagePropInterface):void {
        // Grid organization
        if( (this.props.isMobile != nextProps.isMobile) || (nextProps.posts != this.props.posts)) {
            let distributed = this.props.postsGrid.map((r) => { return r.length; }).reduce((prev, next) => { return prev+next; }, 0);
            const remainingPosts = nextProps.posts.slice(distributed);
            const grid = createThumbnailsGrid(remainingPosts, nextProps.height/2, nextProps.width).map((row) => {
                return row.map((thumb:PostThumbnailsGrid) => {
                    thumb.idx = distributed++;
                    return thumb;
                });
            });
            const buffers:PostThumbnailsGrid[][] = this.props.postsGrid.concat(grid);
            this.props.setPostsGridMap(buffers);
        } else if((nextProps.height != this.props.height) || (nextProps.width != this.props.width)) {
            this.props.setPostsGridMap(createThumbnailsGrid(nextProps.posts, nextProps.height/2, nextProps.width));
        }

        // Routing
        if( nextProps.match.path == gallerie(":slug") ) {
            if(!this.props.isVisualizerOpen) {
                const slug = nextProps.match.params.slug;
            
                for(var i = 0; i < this.props.posts.length; i++) {
                    if(this.props.posts[i].id == slug) {
                        this.props.openVisualizer(this.props.posts, i);
                        break;
                    }
                } 
            } else if (this.props.isVisualizerOpen && nextProps.isVisualizerOpen && nextProps.selected != this.props.selected ) {
                const url = gallerie(nextProps.posts[nextProps.selected].id);
                nextProps.history.push(url);
            } else if(this.props.isVisualizerOpen && !nextProps.isVisualizerOpen) {
                const url = home();
                nextProps.history.push(url);
            }

        } else if( is(nextProps.match.path, home(":page") ) ) {
            const page = nextProps.match.params.page != undefined ?
                         nextProps.match.params.page :
                         "";
            const url = home(page);
            nextProps.history.push(url);
        }
    }

    componentDidMount() {
        this.props.loadGalleryPost('latest', 0, 10);
    };
};

function mapStateToProps(state: StoreState, props:HomePagePropInterface): HomePagePropInterface {
    return {
        posts: state.galleryPosts.posts,
        limit: state.galleryPosts.limit,
        offset: state.galleryPosts.offset,
        selected: state.visualizer.index,
        width: state.applicationConfiguration.innerWidth,
        height: state.applicationConfiguration.innerHeight-state.applicationConfiguration.headerHeight,
        headerHeight: state.applicationConfiguration.headerHeight,
        isMobile: state.applicationConfiguration.isMobile,
        fetchingPost: state.galleryPosts.fetching,
        postEnd: state.galleryPosts.end,
        postsGrid: state.homePagePostThumbnails.map,
        isVisualizerOpen: state.visualizer.open,

        postMobileCoverStartX: state.homePagePostMobile.startX,
        postMobileCoverStartY: state.homePagePostMobile.startY,
        postMobileCoverPosX: state.applicationConfiguration.isMobile ? state.homePagePostMobile.posX : 0,
        postMobileCoverPosY: state.applicationConfiguration.isMobile ? state.homePagePostMobile.posY : 0,
        postMobilePage: state.applicationConfiguration.isMobile ? state.homePagePostMobile.page : 0,
        postMobileCoverDragging: state.homePagePostMobile.dragging,

        match: props.match,
        location: props.location,
        history: props.history
    };
};

function mapDispatchToProps(dispatch: Dispatch<{}>) {
    return {
        postMobileOnDragStart: (posX:number, posY:number) => dispatch(dragStart(posX, posY)),
        postMobileOnDragMove: (posX:number, posY:number) => dispatch(dragMove(posX, posY)),
        postMobileOnDragStop: (page:number) => dispatch(dragStop(page)),
        openVisualizer: (posts: Post[], index: number) => dispatch(visualizerOpen(posts, index)),
        loadGalleryPost: (order:string, offset:number, limit: number) => dispatch(fetchPosts(order, offset, limit)),
        setPostsGridMap: (map:PostThumbnailsGrid[][]) => dispatch(setMap(map))
    }
};

export default HomePage;