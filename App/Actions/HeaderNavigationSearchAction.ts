import { createAction } from "redux-actions";

export const HEADER_NAVIGATION_SEARCH_TYPING_ACTION = "HeaderNavigationSearchTypingAction";
export const HEADER_NAVIGATION_SEARCH_START_ACTION = "HeaderNavigationSearchStartAction";
export const HEADER_NAVIGATION_SEARCH_SUCCESS_ACTION = "HeaderNavigationSearchSuccessAction"
export const HEADER_NAVIGATION_SEARCH_ERROR_ACTION = "HeaderNavigationSearchErrorAction"

export interface HeaderNavigationSearchTypingActionPayload {
    query: string
};

export interface HeaderNavigationSearchStartActionPayload {
    query: string;
};

export interface HeaderNavigationSearchSuccessActionPayload {
    query: string;
    posts: Post[];
};

export interface HeaderNavigationSearchErrorActionPayload {
    query: string;
    error: string;
};

export const headerNavigationSearchTypingAction = createAction<HeaderNavigationSearchTypingActionPayload, HeaderNavigationSearchTypingActionPayload>(HEADER_NAVIGATION_SEARCH_TYPING_ACTION, undefined);
export const headerNavigationSearchStartAction = createAction<HeaderNavigationSearchStartActionPayload, HeaderNavigationSearchStartActionPayload>(HEADER_NAVIGATION_SEARCH_START_ACTION, undefined);
export const headerNavigationSearchSuccessAction = createAction<HeaderNavigationSearchSuccessActionPayload, HeaderNavigationSearchSuccessActionPayload>(HEADER_NAVIGATION_SEARCH_SUCCESS_ACTION, undefined);
export const headerNavigationSearchErrorAction = createAction<HeaderNavigationSearchErrorActionPayload, HeaderNavigationSearchErrorActionPayload>(HEADER_NAVIGATION_SEARCH_ERROR_ACTION, undefined);