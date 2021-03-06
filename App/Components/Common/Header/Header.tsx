import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";

import { StoreState } from "./../../../Store/StoreState";
import BaseComponent from "./../../BaseComponent";
import MediaDisplay from "./../MediaDisplay/MediaDisplay";
import { openSearch, closeSearch } from "./../../../ActionCreators/HeaderNavigationToggleSearchActionCreator";
import { searchTyping, fetchResults } from "./../../../ActionCreators/HeaderNavigationSearchActionCreator";
import { headerResize } from "./../../../ActionCreators/ApplicationConfigurationActionCreators";
import { formatDate } from "./../../../Utils/Date";
import { home, gallerie } from "./../../../Utils/Route";

// tslint:disable-next-line:no-any
const styles: any = require("./Header.module.less");

interface SearchInterface {
    isSearchEnabled?:boolean;
    query?:string;
    results?:Post[];
};

interface HeaderPropInterface {
    navigationElements?:HeaderNavigationElement[];
    search?:SearchInterface;

    height?: number;

    isMediaLoading?: boolean;

    openSearch?: () => void;
    closeSearch?: () => void;
    searchTyping?: (query:string) => void;
    fetchResults?: (query:string) => void;
    heightChange?: (height:number) => void;
};

interface SearchBarPropInterface {
    onClose: () => void;
    onChange: (event) => void;
    onSubmit: () => void;
};

interface NavigationPropInterface {
    elements:HeaderNavigationElement[]
};

interface ToggleHeaderActionPropInterface {
    onSearchClick: () => void;
    onMobileMenuClick: () => void;
};

interface SearchResultsContainerPropInterface {
    results:Post[];
};

interface LogoPropInterface {
    loading: boolean;
}

const Logo = (props: LogoPropInterface) => {
    // , styles.loading
    return (
        <div className={[styles.logoContainer, props.loading ? styles.loading : ""].join(' ')}>
            <Link to={home()}>
                <div className={styles.logoContainerInner}>
                    <div className={styles.hideTopLeft}></div>
                    <div className={styles.hideTopBottom}></div>
                    <div className={styles.hideBottomTop}></div>
                    <div className={styles.hideBottomLeft}></div>
                    <p className={styles.text}>Krstf<span>.io</span></p>
                </div>
            </Link>
        </div>
    )
};


const SearchBar = (props:SearchBarPropInterface) => {
    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchContainerInner}>
                <form action="/" method="POST" onSubmit={(e) => { e.preventDefault(); props.onSubmit(); }}>
                    <ul>
                        <li className={styles.cancel}>
                            <button type="button" className="fa fa-times" onClick={() => props.onClose()}>&nbsp;</button>
                        </li>
                        <li className={styles.searchBar}>
                            <input 
                                type="text" 
                                placeholder="Rechercher une destination, un tag, un mot..." 
                                onChange={(event) => {props.onChange(event.target.value)}} 
                            />
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
};

const Navigation = (props:NavigationPropInterface) => {
    const links = props.elements.map((ell, idx) => {
        const key = `header-navigation-element-${idx}`;
        const classNames = [];
        if( ell.selected ) {
            classNames.push(styles.selected);
        }

        return (
            <li key={key} className={classNames.join(' ')}>
                <Link to={ell.url}>{ell.name}</Link>
            </li>
        )
    });

    return (
        <div className={styles.navigationContainer}>
            <div className={styles.navigationContainerInner}>
                <ul>{links}</ul>
            </div>
        </div>
    );
};

const ToggleHeaderAction = (props:ToggleHeaderActionPropInterface) => {
    return (
        <div className={styles.actionContainer}>
            <div className={styles.actionContainerInner}>
                <ul>
                    <li className={styles.search}><button type="button" className={"fa fa-search"} onClick={() => { props.onSearchClick(); }}></button></li>
                    <li className={styles.hamburger}><button type="button" className={"fa fa-bars"} onClick={() => { props.onMobileMenuClick(); }}></button></li>
                </ul>
            </div>
        </div>
    )
};

const SearchResultsContainer = (props:SearchResultsContainerPropInterface) => {
    const results = props.results.map((r, idx) => {
        const key = `header-search-result-${idx}`;
        let content = null;
        // @TODO: Should be dynamic
        const aspectRatio = 90/222;
        if(r.body == '') {
            content = (
                <div className={styles.images}>
                    <ul style={{width:1000}}>
                        <li><MediaDisplay style={{ width: 640*aspectRatio, height: 222*aspectRatio }} background={'https://c1.staticflickr.com/5/4216/34679008770_a8af0816cc_z.jpg'} color={'red'} random={true} /></li>
                        <li><MediaDisplay style={{ width: 640*aspectRatio, height: 222*aspectRatio }} background={'https://c1.staticflickr.com/5/4216/34679008770_a8af0816cc_z.jpg'} color={'red'} random={true} /></li>
                        <li><MediaDisplay style={{ width: 640*aspectRatio, height: 222*aspectRatio }} background={'https://c1.staticflickr.com/5/4216/34679008770_a8af0816cc_z.jpg'} color={'red'} random={true} /></li>
                    </ul>
                </div>
            );
        } else {
            content = (
                <div className={styles.text}>
                    <ul>
                        <li><p>[...] C'est dans l'archipel d'<span className={styles.highlight}>Okinawa</span>, et dans cette île en particulier, que l'on trouve la plus longue espérance de vie (87 ans en moyenne pour les femmes et 79,4 [...] </p></li>
                        <li><p>[...] L'île d'<span className={styles.highlight}>Okinawa</span> présente de nombreuses traces de son occupation par l'homme aux temps préhistoriques et historiques. [...]</p></li>
                    </ul>
                </div>
            );
        };

        const tags = r.tags.map((t, idx) => {
            const key = `search-result-post-tag-${idx}`;
            return (
                <span key={key} className={styles.hashtag}>#{t.title}</span>
            );
        });
        return (
            <Link key={key} to="#" className={styles.result}>
                <div className="container">
                    <div className="row">
                        <div className={styles.resultInner}>
                            <div className="column column-33">
                                {/*<h2>L'Île d'<span className={styles.highlight}>Okinawa</span> <span className={styles.hashtag}>#voyage</span> <span className={[styles.hashtag, styles.highlight].join(' ')}>#okinawa</span></h2>*/}
                                {/*<h3>Là où les gens vivent plus de 100 ans.</h3>*/}
                                {/*<h4>31 décembre 2016 - <i className="fa fa-clock"></i> 15 min.</h4>*/}
                                {r.title && <h2>{r.title} {tags}</h2>}
                                {r.excerpt && <h3>{r.excerpt}</h3>}
                                {r.date && <h4>{formatDate(r.date)}{r.readingTime && (<span> - <i className="fa fa-clock-o"></i> {r.readingTime} min.</span>)}</h4>}
                            </div>
                            <div className="column column-66">{content}</div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    });

    return (
        <div className={styles.resultsContainer}>
            <div className={styles.resultsContainerInner}>{results}</div>
        </div>
    )
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends BaseComponent<HeaderPropInterface, {}> {
    height = 0;

    isSearchOpen() {
        return this.props.search.isSearchEnabled && this.props.search.query;
    }
    searchClicked() {
        // Search
        if( this.props.search.isSearchEnabled ) {
            if( this.props.search.query && this.props.search.query != '' ) {
                // Perform search
                //console.log('Perform search');
                this.props.fetchResults(this.props.search.query);
            }
        } else {
            this.props.openSearch();
        }
    }

    onHeaderResize(): void {
        const ell = ReactDOM.findDOMNode(this.refs['headerContainer']);
        if( ell == null ) {
            return;
        }

        const size = ell.getBoundingClientRect();
        if( size.height != this.props.height ) {
            this.props.heightChange(size.height);
        }
    }

    doRender(): React.ReactElement<{}> {
        return (
            <div 
                className={[styles.headerContainer, this.props.search.isSearchEnabled ? styles.searching : ''].join(' ')}
                ref="headerContainer"
            >
                <div className={[styles.headerInner].join(' ')}>
                    <div className="container">
                        <div className="row force-row">
                            <div className="column column-80">
                                <Logo loading={this.props.isMediaLoading} />
                                <SearchBar onClose={this.props.closeSearch} onChange={this.props.searchTyping} onSubmit={() => { this.searchClicked();}} />
                                <Navigation elements={this.props.navigationElements} />
                            </div>
                            <div className="column column-20">
                                {/*<ToggleHeaderAction onSearchClick={() => { this.searchClicked(); }} onMobileMenuClick={() => {}} />*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.searchResultsContainer}>
                    <div className={styles.searchResultsContainerInner}>
                        <div className="container">
                            <div className="row">
                                <div className="column">
                                    <h3 className={styles.resultsTitle}>Les plus recherchés</h3>
                                </div>
                            </div>
                        </div>
                        <SearchResultsContainer results={this.props.search.results} />
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(): void {
        window.addEventListener('resize', () => { this.onHeaderResize(); });
        this.onHeaderResize();
    }
};

function mapStateToProps(state: StoreState): HeaderPropInterface {
    return {
        navigationElements: state.navigationElements.elements,
        height: state.applicationConfiguration.headerHeight,
        isMediaLoading: !state.mediaDisplay.ready,
        search: {
            isSearchEnabled: state.headerSearch.isOpen,
            query: state.headerSearch.query,
            results: state.headerSearch.results
        }
    }
}

function mapDispatchToProps(dispatch: Dispatch<{}>): HeaderPropInterface {
    return {
        openSearch: () => dispatch(openSearch()),
        closeSearch: () => dispatch(closeSearch()),
        searchTyping: (query:string) => dispatch(searchTyping(query)),
        fetchResults: (query:string) => dispatch(fetchResults(query)),
        heightChange: (height:number) => dispatch(headerResize(height))
    }
}