import { handleActions } from "redux-actions";
import { galleryPostFetchStartAction, GALLERY_POST_FETCH_START_ACTION, GalleryPostFetchStartActionPayload } from "./../Actions/GalleryPostFetchAction";
import { galleryPostFetchSuccessAction, GALLERY_POST_FETCH_SUCCESS_ACTION, GalleryPostFetchSuccessActionPayload} from "./../Actions/GalleryPostFetchAction";
import { galleryPostFetchErrorAction, GALLERY_POST_FETCH_ERROR_ACTION, GalleryPostFetchErrorActionPayload} from "./../Actions/GalleryPostFetchAction";
import { GalleryPostState } from "./../Store/State/GalleryPostState";

const initialState:GalleryPostState = {
    order: 'latest',
    limit: 20,
    offset: 0,
    posts: [],
    fetching: false,
    end: false
};

export default handleActions<GalleryPostState, void>({
    [GALLERY_POST_FETCH_START_ACTION]: (state, action: ReduxActions.Action<GalleryPostFetchStartActionPayload>) => {
        return {
            ...state,
            order: action.payload.order,
            limit: action.payload.limit,
            offset: action.payload.offset,
            fetching: true
        };
    },
    [GALLERY_POST_FETCH_SUCCESS_ACTION]: (state, action: ReduxActions.Action<GalleryPostFetchSuccessActionPayload>) => {
        return {
            ...state,
            posts: state.posts.concat(action.payload.posts),
            fetching: false,
            end: action.payload.posts.length == 0
        };
    },
    [GALLERY_POST_FETCH_ERROR_ACTION]: (state, action: ReduxActions.Action<GalleryPostFetchSuccessActionPayload>) => {
        return {
            ...state,
            posts: [],
            fetching: false
        }
    }
}, initialState);