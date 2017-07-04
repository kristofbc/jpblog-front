import { handleActions } from "redux-actions";
import { postFetchStartAction, POST_FETCH_START_ACTION, PostFetchStartActionPayload } from "./../Actions/PostFetchAction";
import { postFetchSuccessAction, POST_FETCH_SUCCESS_ACTION, PostFetchSuccessActionPayload} from "./../Actions/PostFetchAction";
import { postFetchErrorAction, POST_FETCH_ERROR_ACTION, PostFetchErrorActionPayload} from "./../Actions/PostFetchAction";
import { StaticPostState } from "./../Store/State/StaticPostState";

const initialState:StaticPostState = {
    id: -1,
    post: null,
    fetching: false
};

export default handleActions<StaticPostState, void>({
    [POST_FETCH_START_ACTION]: (state, action: ReduxActions.Action<PostFetchStartActionPayload>) => {
        return {
            ...state,
            id: action.payload.id,
            fetching: true
        };
    },
    [POST_FETCH_SUCCESS_ACTION]: (state, action: ReduxActions.Action<PostFetchSuccessActionPayload>) => {
        return {
            ...state,
            post: action.payload.post,
            fetching: false
        };
    },
    [POST_FETCH_ERROR_ACTION]: (state, action: ReduxActions.Action<PostFetchSuccessActionPayload>) => {
        return {
            ...state,
            post: null,
            fetching: false
        }
    }
}, initialState);