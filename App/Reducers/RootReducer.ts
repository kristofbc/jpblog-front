import { combineReducers, Reducer } from "redux";
import { StoreState } from "./../Store/StoreState";
import headerNavigationElementReducer from "./HeaderNavigationElementReducer";
import HeaderSearchReducer from "./HeaderSearchReducer";
import GalleryPostReducer from "./GalleryPostReducer";

const rootReducer: Reducer<StoreState> = combineReducers<StoreState>({
    navigationElements: headerNavigationElementReducer,
    headerSearch: HeaderSearchReducer,
    galleryPosts: GalleryPostReducer
});

export default rootReducer;