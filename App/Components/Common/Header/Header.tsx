import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { StoreState } from "./../../../Store/StoreState";
import BaseComponent from "./../../BaseComponent";
import { openSearch, closeSearch } from "./../../../ActionCreators/HeaderNavigationToggleSearchActionCreator";
import { searchTyping } from "./../../../ActionCreators/HeaderNavigationSearchActionCreator";

// tslint:disable-next-line:no-any
const styles: any = require("./Header.module.less");

interface SearchInterface {
    isSearchEnabled?:boolean;
    query?:string;
};

interface HeaderPropInterface {
    navigationElements?:HeaderNavigationElement[];
    search?:SearchInterface;

    openSearch?: () => void,
    closeSearch?: () => void,
    searchTyping?: (query:string) => void
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends BaseComponent<HeaderPropInterface, {}> {
    isSearchOpen() {
        return this.props.search.isSearchEnabled && this.props.search.query;
    }
    searchClicked() {
        // Search
        if( this.props.search.isSearchEnabled ) {
            if( this.props.search.query && this.props.search.query != '' ) {
                // Perform search
                console.log('Perform search');
            }
        } else {
            this.props.openSearch();
        }
    }

    doRender(): React.ReactElement<{}> {

        return (
            <div className={[styles.headerContainer, this.props.search.isSearchEnabled ? styles.searching : ''].join(' ')}>
                <div className={[styles.headerInner].join(' ')}>
                    <div className="container">
                        <div className="row force-row">
                            <div className="column column-80">
                                <div className={styles.logoContainer}>
                                    <a href="#">
                                        <div className={styles.logoContainerInner}>
                                            <div className={styles.hideTop}></div>
                                            <div className={styles.hideLeft}></div>
                                            <div className={styles.hideBottom}></div>
                                            <div className={styles.hideRight}></div>
                                            <p className={styles.text}>Krstf<span>.io</span></p>
                                        </div>
                                    </a>
                                </div>
                                <div className={styles.searchContainer}>
                                    <div className={styles.searchContainerInner}>
                                        <form action="/" method="POST">
                                            <ul>
                                                <li className={styles.cancel}><button type="button" className="fa fa-times" onClick={() => this.props.closeSearch()}>&nbsp;</button></li>
                                                <li className={styles.searchBar}><input type="text" placeholder="Rechercher une destination, un tag, un mot..." onChange={(event) => {this.props.searchTyping(event.target.value)}} /></li>
                                            </ul>
                                        </form>
                                    </div>
                                </div>
                                <div className={styles.navigationContainer}>
                                    <div className={styles.navigationContainerInner}>
                                        <ul>
                                            <li className={styles.selected}><a href="#">Latest</a></li>
                                            <li><a href="#">Trending</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="column column-20">
                                <div className={styles.actionContainer}>
                                    <div className={styles.actionContainerInner}>
                                        <ul>
                                            <li className={styles.search}><button type="button" className={"fa fa-search"} onClick={() => { this.searchClicked() }}></button></li>
                                            <li className={styles.hamburger}><button type="button" className={"fa fa-bars"}></button></li>
                                        </ul>
                                    </div>
                                </div>
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
                        <div className={styles.resultsContainer}>
                            <div className={styles.resultsContainerInner}>

                                <a href="#" className={styles.result}>
                                    <div className="container">
                                        <div className="row">
                                            <div className={styles.resultInner}>
                                                <div className="column column-33">
                                                    <h2>L'Île d'<span className={styles.highlight}>Okinawa</span> <span className={styles.hashtag}>#voyage</span> <span className={[styles.hashtag, styles.highlight].join(' ')}>#okinawa</span></h2>
                                                    <h3>Là où les gens vivent plus de 100 ans.</h3>
                                                    <h4>31 décembre 2016 - <i className="fa fa-clock"></i> 15 min.</h4>
                                                </div>
                                                <div className="column column-66">
                                                    <div className={styles.images}>
                                                        <ul style={{width:1000}}>
                                                            <li><img src="https://c1.staticflickr.com/5/4216/34679008770_a8af0816cc_z.jpg" alt="Img 1" /></li>
                                                            <li><img src="https://c1.staticflickr.com/5/4216/34679008770_a8af0816cc_z.jpg" alt="Img 1" /></li>
                                                            <li><img src="https://c1.staticflickr.com/5/4216/34679008770_a8af0816cc_z.jpg" alt="Img 1" /></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a href="#" className={styles.result}>
                                    <div className="container">
                                        <div className="row">
                                            <div className={styles.resultInner}>
                                                <div className="column column-33">
                                                    <h2>L'Île d'<span className={styles.highlight}>Okinawa</span> <span className={styles.hashtag}>#voyage</span> <span className={[styles.hashtag, styles.highlight].join(' ')}>#okinawa</span></h2>
                                                    <h3>Là où les gens vivent plus de 100 ans.</h3>
                                                    <h4>31 décembre 2016 - <i className="fa fa-clock"></i> 15 min.</h4>
                                                </div>
                                                <div className="column column-66">
                                                    <div className={styles.text}>
                                                        <ul>
                                                            <li><p>[...] C'est dans l'archipel d'<span className={styles.highlight}>Okinawa</span>, et dans cette île en particulier, que l'on trouve la plus longue espérance de vie (87 ans en moyenne pour les femmes et 79,4 [...] </p></li>
                                                            <li><p>[...] L'île d'<span className={styles.highlight}>Okinawa</span> présente de nombreuses traces de son occupation par l'homme aux temps préhistoriques et historiques. [...]</p></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

function mapStateToProps(state: StoreState): HeaderPropInterface {
    console.log(state);
    return {
        navigationElements: state.navigationElements,
        search: {
            isSearchEnabled: state.headerSearch.isOpen,
            query: state.headerSearch.query
        }
    }
}

function mapDispatchToProps(dispatch: Dispatch<{}>): HeaderPropInterface {
    return {
        openSearch: () => dispatch(openSearch()),
        closeSearch: () => dispatch(closeSearch()),
        searchTyping: (query:string) => dispatch(searchTyping(query))
    }
}