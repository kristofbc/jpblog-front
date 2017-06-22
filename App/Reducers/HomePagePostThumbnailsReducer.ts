import { handleActions } from "redux-actions";
import { HOME_PAGE_POST_THUMBNAILS_SET_ACTION, HomePagePostThumbnailsSetActionPayload } from "./../Actions/HomePagePostThumbnailsGridAction";
import { HomePagePostThumbnailsState } from "./../Store/State/HomePagePostThumbnailsState";

const initialState:HomePagePostThumbnailsState = {
    map: []
};

export default handleActions<HomePagePostThumbnailsState, void>({

    [HOME_PAGE_POST_THUMBNAILS_SET_ACTION]: (state, action: ReduxActions.Action<HomePagePostThumbnailsSetActionPayload>) => {
        return {
            map: action.payload.map
        };
    }

}, initialState);