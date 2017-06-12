import { Dispatch } from "redux";

import { mediaDisplayLoadStartAction, MediaDisplayLoadStartActionPayload } from "../Actions/MediaDisplayLoadAction";
import { mediaDisplayLoadCompletedAction, MediaDisplayLoadCompletedActionPayload } from "../Actions/MediaDisplayLoadAction";
import { mediaDisplayLoadErrorAction, MediaDisplayLoadErrorActionPayload } from "../Actions/MediaDisplayLoadAction";

export function mediaLoadStart(url: string): ReduxActions.Action<MediaDisplayLoadStartActionPayload> {
    return mediaDisplayLoadStartAction({ url });
};

export function mediaLoadCompleted(url: string): ReduxActions.Action<MediaDisplayLoadCompletedActionPayload> {
    return mediaDisplayLoadCompletedAction({ url });
};

export function mediaLoadError(url: string): ReduxActions.Action<MediaDisplayLoadErrorActionPayload> {
    return mediaDisplayLoadErrorAction({ url });
};