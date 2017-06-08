import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { StoreState } from "./../../Store/StoreState";

import BaseComponent from "./../BaseComponent";
import Header from "./../Common/Header/Header";
import { formatDate } from "./../../Utils/Date";

// tslint:disable-next-line:no-any
const styles: any = require("./HomePage.module.less");

interface HomePagePropInterface {
    posts?: Post[];
    offset?: number;
    limit?: number;
    selected?: number;
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
        <a href={props.url} className={styles.post} onClick={(e) => { e.preventDefault(); props.onClick(); }}>
            <div className={styles.postInner}>
                <div className={styles.background} style={{ backgroundColor: props.color }}>
                    <img src={props.background} alt={props.title||''} className={props.backgroundWidth >= props.backgroundHeight ? styles.landscape : styles.portrait} />
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
    );
};

const PostGrid = (props:PostGridPropInterface) => {
    const posts = props.posts.map((p, idx) => {
        const key = `home-page-post-grid-post-${idx}`;
        return createPostComponentFromPostModel(p, {key: key});
    });

    return (
        <div className={styles.postsGridContainer}>
            <div className={styles.postsGridContainerInner}>
                {posts}
            </div>
        </div>
    )
};

function createPostComponentFromPostModel(p:Post, props = {}):React.ReactElement<{PostC}> {
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
            width={0}
            height={0}
            onClick={() => {}}
            {...props}
        />
    );
};

@connect(mapStateToProps, mapDispatchToProps)
class HomePage extends BaseComponent<HomePagePropInterface, {}> {
    doRender(): React.ReactElement<{}> {
        return (
            <div>
                <Header navigationElements={[]} search={{}} />
                <div className={styles.postsContainer} ref={"postContainer"}>
                    <div className={styles.postsContainerInner}>
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
                        <PostGrid posts={this.props.posts} />
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
        selected: -1
    };
};

function mapDispatchToProps(dispatch: Dispatch<{}>): HomePagePropInterface {
    return {

    }
};

export default HomePage;