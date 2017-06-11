import { createAction } from "redux-actions";

export const HOME_PAGE_POST_MOBILE_DRAG_START_ACTION = "HomePagePostMobileDragStartAction"
export const HOME_PAGE_POST_MOBILE_DRAG_MOVE_ACTION = "HomePagePostMobileDragMoveAction"
export const HOME_PAGE_POST_MOBILE_DRAG_STOP_ACTION = "HomePagePostMobileDragStopAction"
// export const HOME_PAGE_POST_MOBILE_DRAG_RESET_ACTION = "HomePagePostMobileDragStopAction"
// export const HOME_PAGE_POST_MOBILE_DRAG__ACTION = "HomePagePostMobileDragStopAction"
 
export interface HomePagePostMobileDragStartActionPayload {
    posX: number;
    posY: number;
};

export interface HomePagePostMobileDragMoveActionPayload {
    posX: number;
    posY: number;
};

export interface HomePagePostMobileDragStopActionPayload {
    page: number
};

export const homePagePostMobileDragStartAction = createAction<HomePagePostMobileDragStartActionPayload, HomePagePostMobileDragStartActionPayload>(HOME_PAGE_POST_MOBILE_DRAG_START_ACTION, undefined);
export const homePagePostMobileDragMoveAction = createAction<HomePagePostMobileDragMoveActionPayload, HomePagePostMobileDragMoveActionPayload>(HOME_PAGE_POST_MOBILE_DRAG_MOVE_ACTION, undefined);
export const homePagePostMobileDragStopAction = createAction<HomePagePostMobileDragStopActionPayload, HomePagePostMobileDragStopActionPayload>(HOME_PAGE_POST_MOBILE_DRAG_STOP_ACTION, undefined);