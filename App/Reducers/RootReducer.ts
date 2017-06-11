import { combineReducers, Reducer } from "redux";
import { StoreState } from "./../Store/StoreState";
import headerNavigationElementReducer from "./HeaderNavigationElementReducer";
import HeaderSearchReducer from "./HeaderSearchReducer";
import GalleryPostReducer from "./GalleryPostReducer";
import HomePagePostMobileDragReducer from "./HomePagePostMobileDragReducer";
import ApplicationConfigurationReducer from "./ApplicationConfigurationReducer";
import VisualizerReducer from "./VisualizerReducer";

const rootReducer: Reducer<StoreState> = combineReducers<StoreState>({
    navigationElements: headerNavigationElementReducer,
    headerSearch: HeaderSearchReducer,
    galleryPosts: GalleryPostReducer,
    homePagePostMobile: HomePagePostMobileDragReducer,
    applicationConfiguration: ApplicationConfigurationReducer,
    visualizer: VisualizerReducer
});

export default rootReducer;