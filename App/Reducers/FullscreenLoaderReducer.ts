import { handleActions } from "redux-actions";
import { fullscreeLoaderStartLoadAction, FULLSCREEN_LOADER_START_LOAD_ACTION } from "./../Actions/FullscreenLoaderLoadAction";
import { fullscreeLoaderStopLoadAction, FULLSCREEN_LOADER_STOP_LOAD_ACTION } from "./../Actions/FullscreenLoaderLoadAction";

import { FullscreenLoaderState } from "./../Store/State/FullscreenLoaderState";

const initialState:FullscreenLoaderState = {
    active: true
};

export default handleActions<FullscreenLoaderState, void>({

    [FULLSCREEN_LOADER_START_LOAD_ACTION]: (state, action) => {
        return {
            active: true
        }
    },
    [FULLSCREEN_LOADER_STOP_LOAD_ACTION]: (state, action) => {
        return {
            active: false
        }
    }

}, initialState);