import { combineReducers, Reducer } from "redux";
import { StoreState } from "./../Store/StoreState";
import headerNavigationElementReducer from "./HeaderNavigationElementReducer";
import HeaderSearchReducer from "./HeaderSearchReducer";
import GalleryPostReducer from "./GalleryPostReducer";
import HomePagePostMobileDragReducer from "./HomePagePostMobileDragReducer";
import HomePagePostThumbnailsReducer from "./HomePagePostThumbnailsReducer";
import ApplicationConfigurationReducer from "./ApplicationConfigurationReducer";
import VisualizerReducer from "./VisualizerReducer";
import MediaDisplayReducer from "./MediaDisplayReducer";
import FullscreenLoaderReducer from "./FullscreenLoaderReducer";
import StaticPostReducer from "./StaticPostReducer";

const rootReducer: Reducer<StoreState> = combineReducers<StoreState>({
    navigationElements: headerNavigationElementReducer,
    headerSearch: HeaderSearchReducer,
    galleryPosts: GalleryPostReducer,
    homePagePostMobile: HomePagePostMobileDragReducer,
    homePagePostThumbnails: HomePagePostThumbnailsReducer,
    applicationConfiguration: ApplicationConfigurationReducer,
    visualizer: VisualizerReducer,
    mediaDisplay: MediaDisplayReducer,
    fullscreenLoader: FullscreenLoaderReducer,
    staticPost: StaticPostReducer
});

export default rootReducer;