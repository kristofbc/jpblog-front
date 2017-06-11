import { createAction } from "redux-actions";

export const VISUALIZER_OPEN_ACTION = "VisualizerOpenAction";
export const VISUALIZER_CLOSE_ACTION = "VisualizerCloseAction";
export const VISUALIZER_NEXT_ACTION = "VisualizerNextAction";
export const VISUALIZER_PREVIOUS_ACTION = "VisualizerPreviousAction";
export const VISUALIZER_SET_INDEX_ACTION = "VisualizerSetIndexAction";
export const VISUALIZER_SET_WIDTH_ACTION = "VisualizerSetWidthAction";
export const VISUALIZER_SET_OFFSET_ACTION = "VisualizerSetOffsetAction";

export interface VisualizerOpenActionPayload {
    posts: Post[];
    index: number;
};

export interface VisualizerSetIndexActionPayload {
    index: number;
};

export interface VisualizerSetWidthActionPayload {
    containerWidth: number;
};

export interface VisualizerSetOffsetActionPayload {
    offsetTop: number;
};

export const visualizerOpenAction = createAction<VisualizerOpenActionPayload, VisualizerOpenActionPayload>(VISUALIZER_OPEN_ACTION, undefined);
export const visualizerCloseAction = createAction<void>(VISUALIZER_CLOSE_ACTION, undefined);
export const visualizerNextAction = createAction<void>(VISUALIZER_NEXT_ACTION, undefined);
export const visualizerPreviousAction = createAction<void>(VISUALIZER_PREVIOUS_ACTION, undefined);
export const visualizerSetIndexAction = createAction<VisualizerSetIndexActionPayload, VisualizerSetIndexActionPayload>(VISUALIZER_SET_INDEX_ACTION, undefined);
export const visualizerSetWidthAction = createAction<VisualizerSetWidthActionPayload, VisualizerSetWidthActionPayload>(VISUALIZER_SET_WIDTH_ACTION, undefined);
export const visualizerSetOffsetAction = createAction<VisualizerSetOffsetActionPayload, VisualizerSetOffsetActionPayload>(VISUALIZER_SET_OFFSET_ACTION, undefined);