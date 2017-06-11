import { Dispatch } from "redux";

import { visualizerOpenAction, VisualizerOpenActionPayload } from "../Actions/VisualizerAction";
import { visualizerCloseAction } from "../Actions/VisualizerAction";
import { visualizerNextAction } from "../Actions/VisualizerAction";
import { visualizerPreviousAction } from "../Actions/VisualizerAction";
import { visualizerSetIndexAction, VisualizerSetIndexActionPayload } from "../Actions/VisualizerAction";
import { visualizerSetWidthAction, VisualizerSetWidthActionPayload } from "../Actions/VisualizerAction";
import { visualizerSetOffsetAction, VisualizerSetOffsetActionPayload } from "../Actions/VisualizerAction";

export function visualizerOpen( posts:Post[], index:number ):ReduxActions.Action<VisualizerOpenActionPayload> {
    return visualizerOpenAction({ posts, index });
};

export function visualizerClose(): ReduxActions.Action<void> {
    return visualizerCloseAction();
};

export function visualizerNext(): ReduxActions.Action<void> {
    return visualizerNextAction();
};

export function visualizerPrevious(): ReduxActions.Action<void> {
    return visualizerPreviousAction();
};

export function visualizerSetIndex( index: number ): ReduxActions.Action<VisualizerSetIndexActionPayload> {
    return visualizerSetIndexAction({ index });
};

export function visualizerSetWidth( containerWidth: number): ReduxActions.Action<VisualizerSetWidthActionPayload> {
    return visualizerSetWidthAction({ containerWidth });
};

export function visualizerSetOffset( offsetTop: number ): ReduxActions.Action<VisualizerSetOffsetActionPayload> {
    return visualizerSetOffsetAction({ offsetTop });
}