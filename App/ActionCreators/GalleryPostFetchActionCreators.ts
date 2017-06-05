import { Dispatch } from "redux";

import { galleryPostFetchStartAction, GalleryPostFetchStartActionPayload } from "../Actions/GalleryPostFetchAction";
import { galleryPostFetchSuccessAction, GalleryPostFetchSuccessActionPayload } from "../Actions/GalleryPostFetchAction";
import { galleryPostFetchErrorAction, GalleryPostFetchErrorActionPayload } from "../Actions/GalleryPostFetchAction";

import * as SearchProvider from "../DataLayer/GalleryProvider";

export function fetchPosts( order:string, offset: number, limit: number ): (dispatcher: Dispatch<{}>) => Promise<{}> {
    return (dispatch: Dispatch<{}>) => {
        dispatch(galleryPostFetchStartAction({ order, offset, limit }));

        return SearchProvider.fetchPosts(order, offset, limit)
            .then((result: Post[]) => dispatch(galleryPostFetchSuccessAction({order, offset, limit, posts: result})))
            .catch((e) => dispatch(galleryPostFetchErrorAction({order, offset, limit, error: e})));
    }
}