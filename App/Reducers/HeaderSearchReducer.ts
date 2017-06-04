import { handleActions } from "redux-actions";
import { headerNavigationToggleSearchAction, HEADER_NAVIGATION_TOGGLE_SEARCH_ACTION} from "./../Actions/HeaderNavigationToggleSearchAction";
import { headerNavigationCloseSearchAction, HEADER_NAVIGATION_CLOSE_SEARCH_ACTION} from "./../Actions/HeaderNavigationToggleSearchAction";
import { headerNavigationOpenSearchAction, HEADER_NAVIGATION_OPEN_SEARCH_ACTION} from "./../Actions/HeaderNavigationToggleSearchAction";
import { headerNavigationSearchTypingAction, HEADER_NAVIGATION_SEARCH_TYPING_ACTION, HeaderNavigationSearchTypingActionPayload } from "./../Actions/HeaderNavigationSearchAction";
import { HeaderNavigationState } from "./../Store/State/HeaderSearchState";

const initialState:HeaderNavigationState = {
    isOpen: false,
    query: ''
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
    }
}, initialState);