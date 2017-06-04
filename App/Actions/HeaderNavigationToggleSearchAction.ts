import { createAction } from "redux-actions";

export const HEADER_NAVIGATION_TOGGLE_SEARCH_ACTION = "HeaderNavigationToggleSearchAction";
export const HEADER_NAVIGATION_OPEN_SEARCH_ACTION = "HeaderNavigationOpenSearchAction";
export const HEADER_NAVIGATION_CLOSE_SEARCH_ACTION = "HeaderNavigationCloswSearchAction";

export const headerNavigationToggleSearchAction = createAction<void>(HEADER_NAVIGATION_TOGGLE_SEARCH_ACTION, undefined);
export const headerNavigationOpenSearchAction = createAction<void>(HEADER_NAVIGATION_OPEN_SEARCH_ACTION, undefined);
export const headerNavigationCloseSearchAction = createAction<void>(HEADER_NAVIGATION_CLOSE_SEARCH_ACTION, undefined);