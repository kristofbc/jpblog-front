import { createAction } from "redux-actions";

export const HEADER_NAVIGATION_ELEMENT_LOAD_ACTION = "HeaderNavigationElementLoadAction";

export interface HeaderNavigationElementLoadActionPayload {
    name: string;
    selected: boolean;
    url: string;
};

export const headerNavigationElementLoadAction = createAction<HeaderNavigationElementLoadActionPayload[], HeaderNavigationElementLoadActionPayload[]>(
    HEADER_NAVIGATION_ELEMENT_LOAD_ACTION, 
    undefined
);