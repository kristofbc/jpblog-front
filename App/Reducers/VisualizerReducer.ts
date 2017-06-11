import { handleActions } from "redux-actions";

import { VISUALIZER_OPEN_ACTION, VisualizerOpenActionPayload } from "./../Actions/VisualizerAction";
import { VISUALIZER_CLOSE_ACTION } from "./../Actions/VisualizerAction";
import { VISUALIZER_NEXT_ACTION } from "./../Actions/VisualizerAction";
import { VISUALIZER_PREVIOUS_ACTION } from "./../Actions/VisualizerAction";
import { VISUALIZER_SET_INDEX_ACTION, VisualizerSetIndexActionPayload } from "./../Actions/VisualizerAction";
import { VISUALIZER_SET_WIDTH_ACTION, VisualizerSetWidthActionPayload } from "./../Actions/VisualizerAction";
import { VISUALIZER_SET_OFFSET_ACTION, VisualizerSetOffsetActionPayload } from "./../Actions/VisualizerAction";
import { VisualizerState } from "./../Store/State/VisualizerState";

const initialState:VisualizerState = {
    posts: [],
    index: 0,
    open: false,
    containerWidth: 0,
    offsetTop: 0
};


export default handleActions<VisualizerState, void>({

    [VISUALIZER_OPEN_ACTION]: (state, action: ReduxActions.Action<VisualizerOpenActionPayload>) => {
        return {
            ...state,
            posts: action.payload.posts,
            index: action.payload.index,
            open: true
        };
    },
    [VISUALIZER_CLOSE_ACTION]: (state, action) => {
        return {
            ...state,
            open: false
        };
    },
    [VISUALIZER_NEXT_ACTION]: (state, action) => {
        return {
            ...state,
            index: state.index >= state.posts.length-1 ? 0 : state.index+1
        };
    },
    [VISUALIZER_PREVIOUS_ACTION]: (state, action) => {
        return {
            ...state,
            index: state.index == 0 ? state.posts.length-1 : state.index-1
        };
    },
    [VISUALIZER_SET_INDEX_ACTION]: (state, action: ReduxActions.Action<VisualizerSetIndexActionPayload>) => {
        return {
            ...state,
            index: action.payload.index
        };
    },
    [VISUALIZER_SET_WIDTH_ACTION]: (state, action: ReduxActions.Action<VisualizerSetWidthActionPayload>) => {
        return {
            ...state,
            containerWidth: action.payload.containerWidth
        };
    },
    [VISUALIZER_SET_OFFSET_ACTION]: (state, action: ReduxActions.Action<VisualizerSetOffsetActionPayload>) => {
        return {
            ...state,
            offsetTop: action.payload.offsetTop
        };
    },

}, initialState);