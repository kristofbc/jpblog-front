import { createAction } from "redux-actions";

export const POST_FETCH_START_ACTION = "PostGetStartAction";
export const POST_FETCH_SUCCESS_ACTION = "PostGetSuccessAction";
export const POST_FETCH_ERROR_ACTION = "PostGetErrorAction";

export interface PostFetchStartActionPayload {
    id: number;
};

export interface PostFetchSuccessActionPayload {
    id: number;
    post: Post;
};

export interface PostFetchErrorActionPayload {
    id: number;
    error: string;
};

export const postFetchStartAction = createAction<PostFetchStartActionPayload, PostFetchStartActionPayload>(POST_FETCH_START_ACTION, undefined);
export const postFetchSuccessAction = createAction<PostFetchSuccessActionPayload, PostFetchSuccessActionPayload>(POST_FETCH_SUCCESS_ACTION, undefined);
export const postFetchErrorAction = createAction<PostFetchErrorActionPayload, PostFetchErrorActionPayload>(POST_FETCH_ERROR_ACTION, undefined);