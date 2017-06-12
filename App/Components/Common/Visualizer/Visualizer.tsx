import * as React from "react";
import * as ReactDOM from "react-dom";

import { connect } from "react-redux";
import { Dispatch } from "redux";

import BaseComponent from "./../../BaseComponent";
import MediaDisplay from "./../MediaDisplay/MediaDisplay";
import { StoreState } from "./../../../Store/StoreState";
import { formatDate } from "./../../../Utils/Date"
import { visualizerNext, visualizerPrevious, visualizerSetIndex, visualizerClose, visualizerSetWidth, visualizerSetOffset } from "./../../../ActionCreators/VisualizerActionCreators";
import { createThumbnailsGrid, PostThumbnailsGridInterface } from "./../../../Utils/Post";

// tslint:disable-next-line:no-any
const styles: any = require("./Visualizer.module.less");

interface VisualizerPropInterface {
    posts?: Post[];
    index?: number;
    open?: boolean;
    innerWidth?: number;
    innerHeight?: number;
    containerWidth?: number;
    visualizerOffsetTop?: number;

    nextPost?: () => void;
    previousPost?: () => void;
    setPost?: (index:number) => void;
    closeVisualizer?: () => void;
    setWidthVisualizer?: (containerWidth:number) => void,
    setOffsetVisualizer?: (offsetTop: number) => void
};

interface CurrentPostInformationPropInterface {
    post: Post;
};

interface VisualizerControlsPropInterface {
    onNext: () => void;
    onPrevious: () => void;
    onClose: () => void
};

interface CurrentPostInterface {
    post: Post;
    containerWidth: number;
    containerHeight: number;
    containerOffsetTop: number;
};

interface VisualizerAvailablePostsInterface {
    posts: Post[];
    index: number;
    containerHeight: number;
    containerWidth: number;
    onClick: (index:number) => void;
};

const CurrentPostInformation = (props:CurrentPostInformationPropInterface) => {
    const tags = props.post.tags.map((t, idx) => {
        const key = `search-result-post-tag-${idx}`;
        return (
            <span key={key} className={styles.hashtag}>#{t.title}</span>
        );
    });

    return (
        <div className={styles.currentPostInformationContainer}>
            <div className={styles.currentPostInformationContainerInner}>
                {props.post.title && <h2>{props.post.title} {tags}</h2>}
                {props.post.excerpt && <h3>{props.post.excerpt}</h3>}
                {props.post.date && <h4>{formatDate(props.post.date)}{props.post.readingTime && (<span> - <i className="fa fa-clock-o"></i> {props.post.readingTime} min.</span>)}</h4>}
            </div>
        </div>
    );
}

const VisualizerControls = ( props: VisualizerControlsPropInterface ) => {
    return (
        <div className={styles.visualizerControlsContainer}>
            <div className={styles.visualizerControlsContainerInner}>
                <ul>
                    <li><button onClick={props.onPrevious} type="button"><i className="fa fa-chevron-left"></i> Image Précédente</button></li>
                    <li><button onClick={props.onNext} type="button">Image Suivante <i className="fa fa-chevron-right"></i></button></li>
                    <li><button onClick={props.onClose} type="button"><i className="fa fa-times"></i> Fermer</button></li>
                </ul>
            </div>
        </div>
    );
};

const CurrentPost = (props: CurrentPostInterface) => {
    let maxHeight:any = 'auto';
    if( props.containerHeight && props.containerOffsetTop ) {
        // Big screen: 1200 no more than that, otherwise it's crazy huge
        maxHeight = Math.min(props.containerHeight - props.containerOffsetTop - 20, 1200)
    }

    let width = props.post.media.width;
    let height = props.post.media.height;

    return (
        <div className={styles.currentPostContainer}>
            <div className={styles.currentPostContainerInner}>
                <div
                    className={styles.mediaDisplayContainer}
                    style={{
                        height: maxHeight
                    }}
                >
                    <MediaDisplay 
                        background={props.post.media.url}
                        color={props.post.media.background_color}
                        random={false}
                        style={{
                            width, height
                        }}
                    />
                </div>

                {/*<img 
                    src={props.post.media.url} 
                    alt={props.post.title ? props.post.title : ''} 
                    className={props.post.media.width >= props.post.media.height ? styles.landscape : styles.portrait}
                    style={{
                        maxHeight: maxHeight
                    }}
                />*/}
            </div>
        </div>
    );
};

const VisualizerAvailablePosts = ( props:VisualizerAvailablePostsInterface ) => {
    // Distribute each Post following the linear algorithm to create a nice grid
    const buffers:PostThumbnailsGridInterface[][] = createThumbnailsGrid(props.posts, props.containerHeight/4, props.containerWidth-6);

    let rows = [];
    for( let i = 0; i < buffers.length; i++ ) {
        rows.push(
            buffers[i].map((size, idx) => {
                const key = `home-page-post-grid-post-${idx}`;
                const post = props.posts[size.idx];
                return (
                    <div 
                        key={key} 
                        className={[styles.availablePost, props.index == size.idx ? styles.availablePostSelected : ''].join(' ')}
                        style={{
                            width: size.resize_width,
                            height: size.resize_height
                        }}
                    >
                        <a 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); props.onClick(size.idx); }}
                        >
                            <MediaDisplay 
                                background={post.media.url}
                                color={post.media.background_color}
                                random={true}
                            />
                            {/*<img 
                                src={post.media.url} 
                                alt={post.title ? post.title : ''} 
                                className={post.media.width >= post.media.height ? styles.landscape : styles.portrait}
                            />*/}
                        </a>
                    </div>
                )
            })
        );
    }
    return (
        <div className={styles.visualizerAvailablePostsContainer}>
            <div className={styles.visualizerAvailablePostsContainerInner}>
                {rows.map(function(thumbs, idx) {
                    const key = `visualizer-available-posts-row-${idx}`
                    return (
                        <div 
                            key={key} 
                            style={{ height: buffers[idx][0]["resize_height"] }}
                        >{thumbs}</div>
                    )
                })}
            </div>
        </div>
    );
}

@connect(mapStateToProps, mapDispatchToProps)
class Visualizer extends BaseComponent<VisualizerPropInterface, {}> {
    doRender(): React.ReactElement<{}> {
        const current = this.props.posts[this.props.index];
        return (
            <div className={[styles.visualizerContainer, this.props.open ? styles.visualizerOpened : styles.visualizerClosed].join(' ')}>
                <div className="container">
                    <div className={styles.visualizerContainerInner} ref={"visualizerContainerInner"}>
                        <div className={styles.visualizerTopContainner}>
                            <div className={styles.visualizerTopContainerInner}>
                                <div className={styles.visualizerTopHeader}>
                                    {this.props.posts.length > 0 && (<CurrentPostInformation post={current} />) }
                                    <VisualizerControls 
                                        onNext={this.props.nextPost}
                                        onPrevious={this.props.previousPost}
                                        onClose={this.props.closeVisualizer}
                                    />
                                    <div className="clearfix"></div>
                                </div>
                                <div className={styles.visualizerTopBody} ref={"visualizerTopBody"}>
                                    {this.props.posts.length > 0 && (<CurrentPost post={current} containerHeight={this.props.innerHeight} containerOffsetTop={this.props.visualizerOffsetTop} containerWidth={this.props.containerWidth} />)}
                                </div>
                            </div>
                        </div>

                        <div className={styles.visualizerBottomContainer}>
                            <div className={styles.visualizerBottomContainerInner}>
                                {this.props.posts.length > 0 &&
                                    (<VisualizerAvailablePosts
                                        posts={this.props.posts}
                                        index={this.props.index}
                                        containerWidth={this.props.containerWidth}
                                        containerHeight={this.props.innerHeight}
                                        onClick={this.props.setPost}
                                    />)
                                }
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onWindowResize() {
        const node = ReactDOM.findDOMNode(this.refs['visualizerTopBody']);
        if( node ) {
            const container = node.getBoundingClientRect();
            this.props.setWidthVisualizer(container.width);
            this.props.setOffsetVisualizer(container.top);
        }
        
    };

    onKeyboardEvent(event:KeyboardEvent) {
        const key = event.keyCode;
        switch(key) {
            case 37: // Left
                this.props.previousPost()
                break;
            case 39: // Right
                this.props.nextPost();
                break;
            case 27: // Escape
                this.props.closeVisualizer();
                break;
        }
    };

    componentDidUpdate() {
        if(this.props.visualizerOffsetTop == 0 ) {
            this.onWindowResize();
        }
    }

    componentDidMount() {
        window.addEventListener('resize', () => { this.onWindowResize() });
        window.addEventListener('keyup', (event:KeyboardEvent) => { this.onKeyboardEvent(event); })
        this.onWindowResize();
    };

};


function mapStateToProps(state: StoreState): VisualizerPropInterface {
    return {
        posts: state.visualizer.posts,
        index: state.visualizer.index,
        open: state.visualizer.open,

        innerWidth: state.applicationConfiguration.innerWidth,
        innerHeight: state.applicationConfiguration.innerHeight,
        containerWidth: state.visualizer.containerWidth,
        visualizerOffsetTop: state.visualizer.offsetTop
    }
};

function mapDispatchToProps(dispatch: Dispatch<{}>): VisualizerPropInterface {
    return {
        nextPost: () => dispatch(visualizerNext()),
        previousPost: () => dispatch(visualizerPrevious()),
        setPost: (index:number) => dispatch(visualizerSetIndex(index)),
        closeVisualizer: () => dispatch(visualizerClose()),
        setWidthVisualizer: (containerWidth: number) => dispatch(visualizerSetWidth(containerWidth)),
        setOffsetVisualizer: (offsetTop: number) => dispatch(visualizerSetOffset(offsetTop))
    }
};


export default Visualizer;