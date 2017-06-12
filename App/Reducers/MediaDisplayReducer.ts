import { handleActions } from "redux-actions";
import { MEDIA_DISPLAY_LOAD_START_ACTION, MediaDisplayLoadStartActionPayload } from "./../Actions/MediaDisplayLoadAction";
import { MEDIA_DISPLAY_LOAD_COMPLETED_ACTION, MediaDisplayLoadCompletedActionPayload } from "./../Actions/MediaDisplayLoadAction";
import { MEDIA_DISPLAY_LOAD_ERROR_ACTION, MediaDisplayLoadErrorActionPayload } from "./../Actions/MediaDisplayLoadAction";

import { MediaDisplayState } from "./../Store/State/MediaDisplayState";

const initialState:MediaDisplayState = {
    url: {}
};


export default handleActions<MediaDisplayState, void>({
    
    [MEDIA_DISPLAY_LOAD_START_ACTION]: (state, action: ReduxActions.Action<MediaDisplayLoadStartActionPayload>) => {
        const u = {};
        u[action.payload.url] = false;

        return {
            url: {
                ...state.url,
                ...u
            }
        }
    },
    [MEDIA_DISPLAY_LOAD_COMPLETED_ACTION]: (state, action: ReduxActions.Action<MediaDisplayLoadCompletedActionPayload>) => {
        const u = {};
        u[action.payload.url] = true;

        return {
            url: {
                ...state.url,
                ...u
            }
        }
    },
    [MEDIA_DISPLAY_LOAD_ERROR_ACTION]: (state, action: ReduxActions.Action<MediaDisplayLoadErrorActionPayload>) => {
        const u = {};
        u[action.payload.url] = false;

        return {
            url: {
                ...state.url,
                ...u
            }
        }
    },


}, initialState);