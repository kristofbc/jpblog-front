import { createAction } from "redux-actions";

export const HEADER_NAVIGATION_SEARCH_TYPING_ACTION = "HeaderNavigationSearchTypingAction";

export interface HeaderNavigationSearchTypingActionPayload {
    query: string
};

export const headerNavigationSearchTypingAction = createAction<HeaderNavigationSearchTypingActionPayload, HeaderNavigationSearchTypingActionPayload>(HEADER_NAVIGATION_SEARCH_TYPING_ACTION, undefined);