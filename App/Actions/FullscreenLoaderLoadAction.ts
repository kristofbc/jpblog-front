import { createAction } from "redux-actions";

export const FULLSCREEN_LOADER_START_LOAD_ACTION = "FullscreenLoaderStartLoadAction";
export const FULLSCREEN_LOADER_STOP_LOAD_ACTION = "FullscreenLoaderStopLoadAction";

export const fullscreeLoaderStartLoadAction = createAction<void>(FULLSCREEN_LOADER_START_LOAD_ACTION, undefined);
export const fullscreeLoaderStopLoadAction = createAction<void>(FULLSCREEN_LOADER_STOP_LOAD_ACTION, undefined);