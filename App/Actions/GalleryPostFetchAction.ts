import { createAction } from "redux-actions";

export const GALLERY_POST_FETCH_START_ACTION = "GalleryPostFetchStartAction";
export const GALLERY_POST_FETCH_SUCCESS_ACTION = "GalleryPostFetchSuccessAction";
export const GALLERY_POST_FETCH_ERROR_ACTION = "GalleryPostFetchErrorAction";

export interface GalleryPostFetchStartActionPayload {
    order: string;
    limit: number;
    offset: number;
};

export interface GalleryPostFetchSuccessActionPayload {
    order: string;
    limit: number;
    offset: number;
    posts: Post[];
};

export interface GalleryPostFetchErrorActionPayload {
    order: string;
    limit: number;
    offset: number;
    error: string;
};

export const galleryPostFetchStartAction = createAction<GalleryPostFetchStartActionPayload, GalleryPostFetchStartActionPayload>(GALLERY_POST_FETCH_START_ACTION, undefined);
export const galleryPostFetchSuccessAction = createAction<GalleryPostFetchSuccessActionPayload, GalleryPostFetchSuccessActionPayload>(GALLERY_POST_FETCH_SUCCESS_ACTION, undefined);
export const galleryPostFetchErrorAction = createAction<GalleryPostFetchErrorActionPayload, GalleryPostFetchErrorActionPayload>(GALLERY_POST_FETCH_ERROR_ACTION, undefined);