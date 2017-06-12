import { createAction } from "redux-actions";

export const MEDIA_DISPLAY_LOAD_START_ACTION = "MediaDisplayLoadStartAction";
export const MEDIA_DISPLAY_LOAD_COMPLETED_ACTION = "MediaDisplayLoadCompletedAction";
export const MEDIA_DISPLAY_LOAD_ERROR_ACTION = "MediaDisplayLoadErrorAction";

export interface MediaDisplayLoadStartActionPayload {
    url: string;
};

export interface MediaDisplayLoadCompletedActionPayload {
    url: string;
};

export interface MediaDisplayLoadErrorActionPayload {
    url: string;
};

export const mediaDisplayLoadStartAction = createAction<MediaDisplayLoadStartActionPayload, MediaDisplayLoadStartActionPayload>(MEDIA_DISPLAY_LOAD_START_ACTION, undefined);
export const mediaDisplayLoadCompletedAction = createAction<MediaDisplayLoadCompletedActionPayload, MediaDisplayLoadCompletedActionPayload>(MEDIA_DISPLAY_LOAD_COMPLETED_ACTION, undefined);
export const mediaDisplayLoadErrorAction = createAction<MediaDisplayLoadErrorActionPayload, MediaDisplayLoadErrorActionPayload>(MEDIA_DISPLAY_LOAD_ERROR_ACTION, undefined);