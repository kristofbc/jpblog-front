import { createAction } from "redux-actions";

export const HOME_PAGE_POST_THUMBNAILS_SET_ACTION = "HomePagePostThumbnailsSetAction"

export interface HomePagePostThumbnailsSetActionPayload {
    map: PostThumbnailsGrid[][]
};


export const homePagePostThumbnailsSetAction = createAction<HomePagePostThumbnailsSetActionPayload, HomePagePostThumbnailsSetActionPayload>(HOME_PAGE_POST_THUMBNAILS_SET_ACTION, undefined);