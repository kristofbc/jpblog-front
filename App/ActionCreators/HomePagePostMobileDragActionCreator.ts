import { Dispatch } from "redux";

import { homePagePostMobileDragStartAction, HomePagePostMobileDragStartActionPayload } from "../Actions/HomePagePostMobileDragAction";
import { homePagePostMobileDragMoveAction, HomePagePostMobileDragMoveActionPayload } from "../Actions/HomePagePostMobileDragAction";
import { homePagePostMobileDragStopAction, HomePagePostMobileDragStopActionPayload } from "../Actions/HomePagePostMobileDragAction";

export function dragStart(posX:number, posY:number, startX?:number, startY?:number): ReduxActions.Action<HomePagePostMobileDragStartActionPayload> {
    return homePagePostMobileDragStartAction({ posX, posY });
};

export function dragMove(posX:number, posY:number): ReduxActions.Action<HomePagePostMobileDragMoveActionPayload> {
    return homePagePostMobileDragMoveAction({ posX, posY });
};

export function dragStop(page:number): ReduxActions.Action<HomePagePostMobileDragStopActionPayload> {
    return homePagePostMobileDragStopAction({ page });
};