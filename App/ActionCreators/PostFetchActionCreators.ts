import { Dispatch } from "redux";

import { postFetchStartAction, PostFetchStartActionPayload } from "../Actions/PostFetchAction";
import { postFetchSuccessAction, PostFetchSuccessActionPayload } from "../Actions/PostFetchAction";
import { postFetchErrorAction, PostFetchErrorActionPayload } from "../Actions/PostFetchAction";

import * as PostProvider from "../DataLayer/PostProvider";

export function fetchPost( id: number ): (dispatcher: Dispatch<{}>) => Promise<{}> {
    return (dispatch: Dispatch<{}>) => {
        dispatch(postFetchStartAction({ id }));

        return PostProvider.get(id)
            .then((result: Post) => dispatch(postFetchSuccessAction({id, post: result})))
            .catch((e) => dispatch(postFetchErrorAction({id, error: e})));
    }
}