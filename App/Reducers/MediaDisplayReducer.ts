import { handleActions } from "redux-actions";
import { MEDIA_DISPLAY_LOAD_START_ACTION, MediaDisplayLoadStartActionPayload } from "./../Actions/MediaDisplayLoadAction";
import { MEDIA_DISPLAY_LOAD_COMPLETED_ACTION, MediaDisplayLoadCompletedActionPayload } from "./../Actions/MediaDisplayLoadAction";
import { MEDIA_DISPLAY_LOAD_ERROR_ACTION, MediaDisplayLoadErrorActionPayload } from "./../Actions/MediaDisplayLoadAction";

import { MediaDisplayState } from "./../Store/State/MediaDisplayState";

const initialState:MediaDisplayState = {
    url: {},
    ready: false
};


export default handleActions<MediaDisplayState, void>({
    
    [MEDIA_DISPLAY_LOAD_START_ACTION]: (state, action: ReduxActions.Action<MediaDisplayLoadStartActionPayload>) => {
        const u = { ...state };
        u.url[action.payload.url] = false;

        return {
            ...u,
            ready: false
        }
    },
    [MEDIA_DISPLAY_LOAD_COMPLETED_ACTION]: (state, action: ReduxActions.Action<MediaDisplayLoadCompletedActionPayload>) => {
        const u = { ...state };
        u.url[action.payload.url] = true;
        return {
            ...u,
            ready: ((obj) => { for(var o in obj) if(!obj[o]) { return false; }; return true; })(u.url)
        }
    },
    [MEDIA_DISPLAY_LOAD_ERROR_ACTION]: (state, action: ReduxActions.Action<MediaDisplayLoadErrorActionPayload>) => {
        const u = {... state};
        u.url[action.payload.url] = false;

        return {
            ...u,
            ready: false
        }
    },


}, initialState);