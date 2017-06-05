import { handleActions } from "redux-actions";
import { headerNavigationToggleSearchAction, HEADER_NAVIGATION_TOGGLE_SEARCH_ACTION} from "./../Actions/HeaderNavigationToggleSearchAction";
import { headerNavigationCloseSearchAction, HEADER_NAVIGATION_CLOSE_SEARCH_ACTION} from "./../Actions/HeaderNavigationToggleSearchAction";
import { headerNavigationOpenSearchAction, HEADER_NAVIGATION_OPEN_SEARCH_ACTION} from "./../Actions/HeaderNavigationToggleSearchAction";
import { headerNavigationSearchTypingAction, HEADER_NAVIGATION_SEARCH_TYPING_ACTION, HeaderNavigationSearchTypingActionPayload } from "./../Actions/HeaderNavigationSearchAction";
import { headerNavigationSearchStartAction, HEADER_NAVIGATION_SEARCH_START_ACTION, HeaderNavigationSearchStartActionPayload } from "./../Actions/HeaderNavigationSearchAction";
import { headerNavigationSearchSuccessAction, HEADER_NAVIGATION_SEARCH_SUCCESS_ACTION, HeaderNavigationSearchSuccessActionPayload } from "./../Actions/HeaderNavigationSearchAction";
import { headerNavigationSearchErrorAction, HEADER_NAVIGATION_SEARCH_ERROR_ACTION, HeaderNavigationSearchErrorActionPayload } from "./../Actions/HeaderNavigationSearchAction";
import { HeaderNavigationState } from "./../Store/State/HeaderSearchState";

const initialState:HeaderNavigationState = {
    isOpen: false,
    query: '',
    results: []
};

export default handleActions<HeaderNavigationState, void>({
    [HEADER_NAVIGATION_TOGGLE_SEARCH_ACTION]: (state, action) => {
        return {
            ...state,
            isOpen: !state.isOpen
        }
    },
    [HEADER_NAVIGATION_OPEN_SEARCH_ACTION]: (state, action) => {
        return {
            ...state,
            isOpen: true
        }
    },
    [HEADER_NAVIGATION_CLOSE_SEARCH_ACTION]: (state, action) => {
        return {
            ...state,
            isOpen: false
        }
    },
    [HEADER_NAVIGATION_SEARCH_TYPING_ACTION]: (state, action:ReduxActions.Action<HeaderNavigationSearchTypingActionPayload> ) => {
        return {
            ...state,
            query: action.payload.query
        }
    },
    [HEADER_NAVIGATION_SEARCH_START_ACTION]: (state, action: ReduxActions.Action<HeaderNavigationSearchStartActionPayload>) => {
        return {
            ...state,
            query: action.payload.query
        }
    },
    [HEADER_NAVIGATION_SEARCH_SUCCESS_ACTION]: (state, action: ReduxActions.Action<HeaderNavigationSearchSuccessActionPayload>) => {
        return {
            ...state,
            query: action.payload.posts,
            results: action.payload.posts
        }
    },
    [HEADER_NAVIGATION_SEARCH_ERROR_ACTION]: (state, action: ReduxActions.Action<HeaderNavigationSearchErrorActionPayload>) => {
        return {
            ...state,
            query: action.payload.query,
            results: []
        }
    }
}, initialState);