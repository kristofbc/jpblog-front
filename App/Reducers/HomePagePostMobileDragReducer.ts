import { handleActions } from "redux-actions";
import { HOME_PAGE_POST_MOBILE_DRAG_START_ACTION, HomePagePostMobileDragStartActionPayload } from "./../Actions/HomePagePostMobileDragAction";
import { HOME_PAGE_POST_MOBILE_DRAG_MOVE_ACTION, HomePagePostMobileDragMoveActionPayload } from "./../Actions/HomePagePostMobileDragAction";
import { HOME_PAGE_POST_MOBILE_DRAG_STOP_ACTION, HomePagePostMobileDragStopActionPayload } from "./../Actions/HomePagePostMobileDragAction";
import { HomePagePostMobileState } from "./../Store/State/HomePagePostMobileState";

const initialState:HomePagePostMobileState = {
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0,
    dragging: false,
    page: 0
};


export default handleActions<HomePagePostMobileState, void>({
    [HOME_PAGE_POST_MOBILE_DRAG_START_ACTION]: (state, action: ReduxActions.Action<HomePagePostMobileDragStartActionPayload>) => {
        return {
            ...state,
            dragging: true,
            startX: action.payload.posX,
            startY: action.payload.posY
        };
    },
    [HOME_PAGE_POST_MOBILE_DRAG_MOVE_ACTION]: (state, action: ReduxActions.Action<HomePagePostMobileDragMoveActionPayload>) => {
        return {
            ...state,
            posX: action.payload.posX - state.startX,
            posY: action.payload.posY - state.startY
        };
    },
    [HOME_PAGE_POST_MOBILE_DRAG_STOP_ACTION]: (state, action: ReduxActions.Action<HomePagePostMobileDragStopActionPayload>) => {
        return {
            ...state,
            dragging: false,
            startX: 0,
            startY: 0,
            posX: 0,
            posY: 0,
            page: action.payload.page
        };
    },

}, initialState);