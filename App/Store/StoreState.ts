import { HeaderNavigationElementState } from "./State/HeaderNavigationElementState";
import { HeaderNavigationState } from "./State/HeaderSearchState";
import { GalleryPostState } from "./State/GalleryPostState";

export interface StoreState {
    navigationElements: HeaderNavigationElementState;
    headerSearch: HeaderNavigationState;
    galleryPosts: GalleryPostState;
};