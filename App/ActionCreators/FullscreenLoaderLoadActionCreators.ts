import { Dispatch } from "redux";

import { fullscreeLoaderStartLoadAction } from "../Actions/FullscreenLoaderLoadAction";
import { fullscreeLoaderStopLoadAction } from "../Actions/FullscreenLoaderLoadAction";

export function fullscreenLoaderStartLoad(): ReduxActions.Action<void> {
    return fullscreeLoaderStartLoadAction();
}
export function fullscreenLoaderStopLoad(): ReduxActions.Action<void> {
    return fullscreeLoaderStopLoadAction();
}